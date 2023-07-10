import {
    Grid,
    GridItem,
    Heading,
    Image,
    Stack,
    Text,
    Center,
    Button,
    Divider,
    Icon,
    Box,
    Textarea,
    Code,
    Input,
    FormLabel,
    HStack,
    Spinner,
} from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { colors } from "../../constants/ColorsConstants";
import NavBarComponent from "../../components/NavBarComponent";
import ReviewsComponent from "../../components/ReviewsComponent";
import { postCart } from "../../api/Cart/Cart";
import { FaHome } from "react-icons/fa";
import { BOOK_IMAGE_URL } from "../..//constants/ApiConstants";
import { getUserData } from "../../secret/userInfo";
import { ToastContainer, toast } from "react-toastify";
import { updateBookDetails, deleteBook } from "../../api/Books/Books";

import "react-toastify/dist/ReactToastify.css";

function BookDetailPage() {
    const { state } = useLocation();
    const [user, setUser] = useState({ userId: 0 });
    const {
        bookId,
        bookName,
        bookDescription,
        bookLanguage,
        bookPrice,
        bookAuthor,
        totalPages,
        bookImg,
        bookQuantity,
        publisherId,
        previousOwnership,
    } = state;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [addToCartCount, setAddToCartCount] = useState(0);

    const [bookData, setBookData] = useState({
        bookName: bookName,
        bookDescription: bookDescription,
        bookLanguage: bookLanguage,
        bookPrice: bookPrice,
        totalPages: totalPages,
        bookQuantity: bookQuantity,
        bookAuthor: bookAuthor,
        publisherId: publisherId,
        previousOwnership: previousOwnership,
    });

    async function renderPage() {
        setLoading(true);
        let userData = await getUserData();
        setUser({ userId: userData.userId });
        setLoading(false);
    }

    const handleChanges = (event) => {
        setBookData({ ...bookData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        await updateBookDetails(bookId, bookData);
        setLoading(false);
    };

    useEffect(() => {
        renderPage();
    }, []);

    return (
        <Fragment>
            {loading && (
                <Box
                    position={"fixed"}
                    zIndex={300}
                    opacity={0.5}
                    h={"100%"}
                    w={"100vw"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    bg={"white"}
                >
                    <Spinner size={"lg"} />
                </Box>
            )}
            <NavBarComponent />

            <ToastContainer />

            <Box
                bg={"blue.500"}
                borderRadius={"20%"}
                w={"fit-content"}
                p={1}
                position={"fixed"}
                bottom={5}
                right={5}
                boxShadow={"xl"}
                zIndex={100}
                onClick={() => {
                    navigate("/books");
                }}
                _hover={{ cursor: "pointer" }}
            >
                <Icon as={FaHome} boxSize={8} color={"white"}></Icon>
            </Box>

            <Box mt="120px">
                <Grid
                    templateColumns="repeat(4, 1fr)"
                    gap={4}
                    m={{ base: 5, sm: 5, md: 20, lg: 20 }}
                >
                    <GridItem colSpan={{ base: 4, sm: 1, md: 1, lg: 1 }}>
                        <Center>
                            <Image
                                src={`${BOOK_IMAGE_URL}${bookId}${bookImg}`}
                                h={300}
                            />
                        </Center>
                    </GridItem>
                    <GridItem
                        colSpan={{ base: 4, sm: 3, md: 3, lg: 3 }}
                        border="1px solid"
                    >
                        <Stack
                            m={{ base: 3, sm: 3, md: 10, lg: 10 }}
                            spacing={3}
                        >
                            {publisherId !== user.userId && (
                                <Fragment>
                                    <Heading>{bookName}</Heading>
                                    <Text color={colors.paragraph}>
                                        {bookDescription}
                                    </Text>
                                    <Text color={"red"}>{bookLanguage}</Text>
                                    <Text>Total pages: {totalPages}</Text>
                                    <Text
                                        color={colors.cost}
                                        fontWeight={"semibold"}
                                        fontSize={30}
                                    >
                                        ₹{bookPrice}
                                    </Text>
                                </Fragment>
                            )}
                            {publisherId === user.userId && (
                                <Fragment>
                                    <FormLabel>Book Name: </FormLabel>
                                    <Input
                                        type="text"
                                        name="bookName"
                                        value={bookData.bookName}
                                        onChange={handleChanges}
                                    />
                                    <FormLabel>Book description: </FormLabel>
                                    <Textarea
                                        value={bookData.bookDescription}
                                        h={"200"}
                                        name="bookDescription"
                                        onChange={handleChanges}
                                    />
                                    <FormLabel>Book language: </FormLabel>
                                    <Input
                                        type="text"
                                        name="bookLanguage"
                                        value={bookData.bookLanguage}
                                        onChange={handleChanges}
                                    />
                                    <FormLabel>Book author: </FormLabel>
                                    <Input
                                        type="text"
                                        name="bookAuthor"
                                        value={bookData.bookAuthor}
                                        onChange={handleChanges}
                                    />

                                    <FormLabel>Total pages: </FormLabel>
                                    <Input
                                        name="totalPages"
                                        type="number"
                                        value={bookData.totalPages}
                                        onChange={handleChanges}
                                    />

                                    <FormLabel>Book price(INR): </FormLabel>
                                    <Input
                                        type="number"
                                        name="bookPrice"
                                        value={bookData.bookPrice}
                                        onChange={handleChanges}
                                    />

                                    <FormLabel>In stock: </FormLabel>
                                    <Input
                                        type="number"
                                        name="bookQuantity"
                                        value={bookData.bookQuantity}
                                        onChange={handleChanges}
                                    />

                                    <HStack>
                                        <Button
                                            bg={"green.500"}
                                            color={"white"}
                                            onClick={handleSubmit}
                                        >
                                            Apply changes
                                        </Button>
                                        <Button
                                            bg={"red.500"}
                                            color={"white"}
                                            onClick={async () => {
                                                await deleteBook(bookId);
                                                navigate("/books");
                                            }}
                                        >
                                            Delete book
                                        </Button>
                                    </HStack>
                                </Fragment>
                            )}

                            <Divider></Divider>
                            <Button
                                width={40}
                                bg={colors.primaryButton}
                                fontWeight={"normal"}
                                isDisabled={
                                    user.userId === previousOwnership ||
                                    user.userId === publisherId
                                }
                                onClick={() => {
                                    if (addToCartCount + 1 > bookQuantity) {
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
                                    } else {
                                        postCart(user.userId, bookId, 1);
                                        setAddToCartCount((prev) => prev + 1);
                                        toast.success("Book added to cart", {
                                            position: "bottom-right",
                                            autoClose: 3000,
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
                                Add to cart
                            </Button>
                        </Stack>
                    </GridItem>
                </Grid>
            </Box>

            <ReviewsComponent />
        </Fragment>
    );
}

export default BookDetailPage;
