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
        totalPages,
        bookImg,
    } = state;
    const navigate = useNavigate();

    async function renderPage() {
        let userData = await getUserData();
        setUser({ userId: userData.userId });
    }

    useEffect(() => {
        renderPage();
    }, []);

    return (
        <Fragment>
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
                            <Divider></Divider>
                            <Button
                                width={40}
                                bg={colors.primaryButton}
                                fontWeight={"normal"}
                                onClick={() => {
                                    postCart(user.userId, bookId, 1);
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
