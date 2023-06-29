import {
    Button,
    Grid,
    GridItem,
    Heading,
    Text,
    Box,
    Divider,
} from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent";
import { colors } from "../../constants/ColorsConstants";
import { fetchCart } from "../../api/Cart/Cart";
import CartItemComponent from "../../components/CartItemComponent";
import { useNavigate } from "react-router";
import { postOrder, postOrderItem } from "../../api/Order/Order";

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

    const [cartItems, setCartItems] = useState([]);
    const [itemsFetched, setItemFetched] = useState(false);

    const [totalItems, setTotalItems] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    async function fetchCartFromApi(userId) {
        setCartItems((await fetchCart(userId)).data);
        if (cartItems.length > 0) {
            setTotalItems(getNumberOfItems(cartItems));
            setTotalCost(estimateTotalPrice(cartItems));
        } else {
            setTotalCost(0);
            setTotalItems(0);
        }
        setItemFetched(true);
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
                cartItem.book.bookId,
                cartItem.bookQuantity
            );
        }
    }

    useEffect(() => {
        fetchCartFromApi(3);
    }, [itemsFetched, totalItems, totalCost]);

    return (
        <Fragment>
            <NavBarComponent />
            <Box m={5}>
                <Heading>Shopping Bag</Heading>
            </Box>
            <Divider borderColor={"blackAlpha.400"} />

            <Grid templateColumns="repeat(8, 1fr)" gap={5} m={15}>
                <GridItem colSpan={{ base: 8, md: 6, lg: 6 }}>
                    {itemsFetched &&
                        cartItems.toReversed().map((cartItem, index) => {
                            return (
                                <Fragment key={cartItem.cartId}>
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
                            postNewOrder(3, "user address").then((response) => {
                                let orderId = response.data.orderId;
                                postOrderItems(orderId).then(() => {
                                    navigate(`/books`);
                                });
                            });
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
