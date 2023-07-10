import {
    Button,
    Code,
    Grid,
    GridItem,
    Heading,
    Image,
    HStack,
    Text,
    Center,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { incrementItem, decrementItem, deleteCartItem } from "../api/Cart/Cart";
import { BOOK_IMAGE_URL } from "../constants/ApiConstants";
import { ToastContainer, toast } from "react-toastify";

function CartItemComponent(props) {
    const { cartId, book, bookQuantity } = props.data;
    const {
        setItemFetched,
        setTotalItems,
        setTotalCost,
        validOrder,
        outOfStock,
    } = props;
    const [bookQty, setQuantity] = useState(bookQuantity);

    return (
        <Grid
            templateColumns="repeat(6, 1fr)"
            gap={10}
            bg={"blackAlpha.200"}
            p={5}
            mt={3}
            borderRadius={10}
        >
            <GridItem colSpan={2}>
                <Center display={"block"} textAlign={"center"}>
                    <Image
                        src={`${BOOK_IMAGE_URL}${book.bookId}${book.bookImg}`}
                        h={{ base: "130px", md: "200px" }}
                        w={{ base: "150px" }}
                    />
                    <Text
                        fontSize={13}
                        fontWeight={"bold"}
                        mt={3}
                        display={{ base: "block", md: "none" }}
                    >
                        ₹{book.bookPrice}.00
                    </Text>
                </Center>
            </GridItem>
            <GridItem colSpan={3} mt={3}>
                <Heading fontSize={{ base: 20, md: 25 }}>
                    {book.bookName}
                </Heading>
                {!outOfStock && (
                    <Code color={"green"} mt={3} border={"1px solid green"}>
                        In stock
                    </Code>
                )}
                {outOfStock && (
                    <Code color={"red"} mt={3} border={"1px solid red"}>
                        Out of stock
                    </Code>
                )}
                <HStack mt={3}>
                    <Text>Qty:</Text>
                    <Button
                        width={5}
                        height={5}
                        onClick={() => {
                            decrementItem(cartId).then(() => {
                                setTotalItems((prev) => prev - 1);
                                setTotalCost((prev) => prev - book.bookPrice);
                                if (bookQty > 1) {
                                    setQuantity((prev) => prev - 1);
                                } else {
                                    setItemFetched(false);
                                }
                            });
                        }}
                    >
                        -
                    </Button>
                    <Text>{bookQty}</Text>
                    <Button
                        isDisabled={outOfStock}
                        width={5}
                        height={5}
                        onClick={() => {
                            if (book.bookQuantity >= bookQty + 1) {
                                incrementItem(cartId).then(() => {
                                    setTotalItems((prev) => prev + 1);
                                    setQuantity((prev) => prev + 1);
                                    setTotalCost(
                                        (prev) => prev + book.bookPrice
                                    );
                                });
                            } else {
                                toast.error("!Limit exceeded", {
                                    position: "top-center",
                                    autoClose: 1000,
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
                        +
                    </Button>
                </HStack>
                <HStack gap={0} mt={3}>
                    <Text color={"red"}>*</Text>
                    <Text>{book.bookLanguage}</Text>
                </HStack>
                <Text
                    mt={3}
                    color={"#5193a1"}
                    w={"fit-content"}
                    _hover={{
                        cursor: "pointer",
                        textDecoration: "underline",
                    }}
                    onClick={() => {
                        deleteCartItem(cartId).then(() => {
                            setItemFetched(false);
                        });
                    }}
                >
                    Remove
                </Text>
            </GridItem>

            <GridItem
                colSpan={1}
                mt={3}
                display={{ base: "none", md: "block", lg: "block" }}
            >
                <Heading fontSize={20}>INR {bookQty * book.bookPrice}</Heading>
            </GridItem>
        </Grid>
    );
}

export default CartItemComponent;
