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
    useRadioGroup,
    Code,
} from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent";
import { colors } from "../../constants/ColorsConstants";
import { fetchCart } from "../../api/Cart/Cart";
import CartItemComponent from "../../components/CartItemComponent";
import { useNavigate } from "react-router";
import { updateCount } from "../../api/Books/Books";
import { postOrder, postOrderItem } from "../../api/Order/Order";
import { getUserData } from "../../secret/userInfo";
import { fetchAddress } from "../../api/Address/Address";
import { updateAccount } from "../../api/Account/Account";
import { ToastContainer, toast } from "react-toastify";

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
            await postOrderItem(
                orderId,
                cartItem.book.bookName,
                cartItem.book.bookDescription,
                cartItem.book.bookAuthor,
                cartItem.book.bookLanguage,
                cartItem.book.totalPages,
                cartItem.bookQuantity,
                cartItem.book.bookPrice,
                cartItem.book.publisherId,
                cartItem.book.previousOwnership
            );
            await updateCount(cartItem.book.bookId, cartItem.bookQuantity);
            let publisherCommision = 0.25 * (cartItem.book.bookPrice * cartItem.bookQuantity);
            await updateAccount({
                pid: cartItem.book.publisherId,
                oid: cartItem.book.previousOwnership,
                publisherShare: publisherCommision,
                ownershipShare: cartItem.bookQuantity * cartItem.book.bookPrice,
            });
        }
    }

    async function newOrder(address) {
        setTimeout(async () => {
            const userData = await getUserData();
            postNewOrder(userData.userId, address).then((response) => {
                let orderId = response.data.orderId;
                postOrderItems(orderId).then(() => {
                    navigate(`/books`);
                });
            });
        }, 2000);
    }

    useEffect(() => {
        fetchCartFromApi();
    }, [itemsFetched, totalItems, totalCost]);

    return (
        <Fragment>
            <NavBarComponent />
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
                                            await newOrder(address[0]);
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
                                        onClick={() => {
                                            newOrder(address[1]);
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
                                        onClick={() => {
                                            newOrder(address[2]);
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
                        INR {totalCost}.00
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
