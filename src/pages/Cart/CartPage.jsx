import {
    Button,
    Grid,
    GridItem,
    Heading,
    Text,
    Box,
    Divider,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Stack,
    Code,
    Spinner,
} from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent";
import { colors } from "../../constants/ColorsConstants";
import { fetchCart } from "../../api/Cart/Cart";
import CartItemComponent from "../../components/CartItemComponent";
import { useNavigate } from "react-router";
import { updateCount, deleteBook } from "../../api/Books/Books";
import {
    insertOrderItems,
    postOrder,
    postOrderItem,
} from "../../api/Order/Order";
import { getUserData } from "../../secret/userInfo";
import { fetchAddress } from "../../api/Address/Address";
import { updateAccount } from "../../api/Account/Account";
import { ToastContainer, toast } from "react-toastify";
import { RAZOR_KEY } from "../../constants/Payment";

import "react-toastify/dist/ReactToastify.css";

function getNumberOfItems(cart) {
    let totalItems = 0;
    for (var item of cart) {
        totalItems += item.bookQuantity;
    }
    return totalItems;
}

function estimateTotalPrice(cart) {
    let totalPrice = 0;
    for (var item of cart) {
        totalPrice += item.bookQuantity * item.book.bookPrice;
    }
    return totalPrice;
}

function CartPage() {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [cartItems, setCartItems] = useState([]);
    const [itemsFetched, setItemFetched] = useState(false);

    const [totalItems, setTotalItems] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    const [address, setAddress] = useState([]);

    const [loading, setLoading] = useState(false);

    async function fetchAddressFromAPI(userId) {
        var response = await fetchAddress(userId);
        let tmpAddress = [];
        tmpAddress.push(response.data.address1);
        tmpAddress.push(response.data.address2);
        tmpAddress.push(response.data.address3);
        setAddress(tmpAddress);
    }

    async function fetchCartFromApi() {
        const userData = await getUserData();
        let responseCarts = (await fetchCart(userData.userId)).data;
        setCartItems(responseCarts);
        let itemsTotal = getNumberOfItems(responseCarts);
        setTotalItems(itemsTotal);
        let costOfAllItems = estimateTotalPrice(responseCarts);
        setTotalCost(costOfAllItems);
        setItemFetched(true);
        await fetchAddressFromAPI(userData.userId);
    }

    async function postNewOrder(userId, userAddress) {
        return await postOrder(
            userId,
            "" + new Date().toLocaleString(),
            userAddress,
            totalItems,
            totalCost
        );
    }

    async function postOrderItems(orderId) {
        for (var cartItem of cartItems) {
            if (cartItem.book.bookQuantity - cartItem.bookQuantity <= 0) {
                await deleteBook(cartItem.book.bookId);
            } else {
                await updateCount(cartItem.book.bookId, cartItem.bookQuantity);
            }

            // await postOrderItem(
            //     orderId,
            //     cartItem.book.bookName,
            //     cartItem.book.bookDescription,
            //     cartItem.book.bookAuthor,
            //     cartItem.book.bookLanguage,
            //     cartItem.book.totalPages,
            //     cartItem.bookQuantity,
            //     cartItem.book.bookPrice,
            //     cartItem.book.publisherId,
            //     cartItem.book.previousOwnership
            // );

            let publisherCommision =
                0.25 * (cartItem.book.bookPrice * cartItem.bookQuantity);
            await updateAccount({
                pid: cartItem.book.publisherId,
                oid: cartItem.book.previousOwnership,
                publisherShare: publisherCommision,
                ownershipShare: cartItem.bookQuantity * cartItem.book.bookPrice,
            });
        }
        await insertOrderItems(orderId, cartItems);
    }

    function isValidOrder() {
        for (var item of cartItems) {
            if (item.book.bookQuantity < item.bookQuantity) {
                return false;
            }
        }
        return true;
    }

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function onPaymentRequest(address) {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        try {
            const options = {
                key: RAZOR_KEY,
                amount: totalCost * 100,
                currency: "INR",
                name: "Bookworm",
                description: "Transaction",
                prefill: {
                    contact: "+919900000000",
                },
                handler: async function (res) {
                    await newOrder(address);
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else {
                console.log("Non-Axios Error:", error);
            }
        }
    }

    async function newOrder(address) {
        if (!isValidOrder()) {
            toast.error("Some items in your cart are out of stock", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        } else {
            setLoading(true);
            const userData = await getUserData();
            postNewOrder(userData.userId, address).then((response) => {
                let orderId = response.data.orderId;
                postOrderItems(orderId).then(() => {
                    setLoading(false);
                    navigate(`/books`);
                });
            });
        }
    }

    useEffect(() => {
        fetchCartFromApi();
    }, [itemsFetched, totalItems, totalCost]);

    return (
        <Fragment>
            <NavBarComponent />
            {loading && (
                <Box
                    position={"fixed"}
                    zIndex={300}
                    h={"100vh"}
                    w={"100vw"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    bg={"white"}
                >
                    <Spinner size={"lg"} />
                </Box>
            )}
            <ToastContainer />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Choose a delievery address</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack>
                            {address[0] && (
                                <Box>
                                    <Code bg={"red.400"} color={"white"}>
                                        Home
                                    </Code>
                                    <Box
                                        boxShadow={"xl"}
                                        border={"0.5px solid"}
                                        p={2}
                                        borderRadius={5}
                                        _hover={{
                                            bg: "#DCDCDC",
                                            cursor: "pointer",
                                        }}
                                        onClick={async () => {
                                            await onPaymentRequest(address[0]);
                                        }}
                                    >
                                        {address[0]}
                                    </Box>
                                </Box>
                            )}

                            {address[1] && (
                                <Box>
                                    <Code bg={"blue.400"} color={"white"}>
                                        Work
                                    </Code>
                                    <Box
                                        boxShadow={"xl"}
                                        border={"0.5px solid"}
                                        p={2}
                                        borderRadius={5}
                                        _hover={{
                                            bg: "#DCDCDC",
                                            cursor: "pointer",
                                        }}
                                        onClick={async () => {
                                            await onPaymentRequest(address[1]);
                                        }}
                                    >
                                        {address[1]}
                                    </Box>
                                </Box>
                            )}

                            {address[2] && (
                                <Box>
                                    <Code bg={"orange.400"} color={"white"}>
                                        Other
                                    </Code>
                                    <Box
                                        boxShadow={"xl"}
                                        border={"0.5px solid"}
                                        p={2}
                                        borderRadius={5}
                                        _hover={{
                                            bg: "#DCDCDC",
                                            cursor: "pointer",
                                        }}
                                        onClick={async () => {
                                            await onPaymentRequest(address[2]);
                                        }}
                                    >
                                        {address[2]}
                                    </Box>
                                </Box>
                            )}
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Text mr={10} color={"red.400"}>
                            *click on a address to proceed
                        </Text>
                        <Button mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Box mt={20} ml={5} mr={5} mb={5}>
                <Heading>Shopping Bag</Heading>
            </Box>
            <Divider borderColor={"blackAlpha.400"} />

            <Grid
                templateColumns="repeat(8, 1fr)"
                gap={5}
                mt={15}
                ml={15}
                mr={15}
                mb={{ base: 200, md: 15 }}
            >
                <GridItem colSpan={{ base: 8, md: 6, lg: 6 }}>
                    {itemsFetched &&
                        cartItems.toReversed().map((cartItem, index) => {
                            return (
                                <Fragment key={index}>
                                    <CartItemComponent
                                        data={cartItem}
                                        outOfStock={
                                            cartItem.book.bookQuantity <
                                            cartItem.bookQuantity
                                        }
                                        setItemFetched={setItemFetched}
                                        setTotalItems={setTotalItems}
                                        setTotalCost={setTotalCost}
                                    />
                                </Fragment>
                            );
                        })}
                </GridItem>

                <GridItem
                    colSpan={{ base: 8, md: 2, lg: 2 }}
                    p={5}
                    bg={{ base: "white", md: "blackAlpha.200" }}
                    alignItems={"center"}
                    h={"fit-content"}
                    w={{ base: "100vw", md: "280px" }}
                    bottom={0}
                    mt={3}
                    position={{ base: "fixed", md: "relative", lg: "relative" }}
                >
                    <Text fontWeight={"semibold"}>
                        Subtotal ({totalItems}) item:{" "}
                    </Text>
                    <Text fontWeight={"bold"} mt={3}>
                        INR {totalCost}
                    </Text>
                    <Button
                        bg={colors.primaryButton}
                        mt={3}
                        onClick={() => {
                            if (cartItems.length > 0) {
                                if (address[0] || address[1] || address[2]) {
                                    onOpen();
                                } else {
                                    toast.error(
                                        "Set the delivery address for your profile",
                                        {
                                            position: "top-center",
                                            autoClose: 2000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: false,
                                            draggable: false,
                                            progress: undefined,
                                            theme: "light",
                                        }
                                    );
                                }
                            } else {
                                toast.error("Add some books in cart", {
                                    position: "top-center",
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: false,
                                    progress: undefined,
                                    theme: "light",
                                });
                            }
                        }}
                    >
                        Proceed to checkout
                    </Button>
                </GridItem>
            </Grid>
        </Fragment>
    );
}

export default CartPage;
