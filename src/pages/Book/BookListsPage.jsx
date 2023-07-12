import React, { Fragment, useEffect, useState } from "react";
import { fetchBooks } from "../../api/Books/Books";
import { fetchQuotes } from "../../api/Quotes/FetchQuotes";
import {
    Code,
    Center,
    Text,
    Button,
    Box,
    Icon,
    Flex,
    Spinner,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Input,
    FormLabel,
    Divider,
    HStack,
    Stack,
} from "@chakra-ui/react";
import BookComponent from "../../components/BookComponent";
import NavBarComponent from "../../components/NavBarComponent";
import { colors } from "../../constants/ColorsConstants";
import { FaPlusCircle, FaRecycle } from "react-icons/fa";
import { useNavigate } from "react-router";
import { FaFilter } from "react-icons/fa";
import { getUserData } from "../../secret/userInfo";

function BookListsPage() {
    const [hasBooksFetched, setHasBooksFetched] = useState(false);
    const [books, setBooks] = useState([]);
    const [quotes, setQuotes] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [priceFilter, setPriceFilter] = useState(0);
    const [bookType, setBookType] = useState(0);
    const [isAdmin, setAdmin] = useState(false);

    const [filterData, setFilterData] = useState({
        bookName: "",
        author: "",
    });

    const handleChange = (event) => {
        setFilterData({
            ...filterData,
            [event.target.name]: event.target.value,
        });
    };

    async function fetchFromApi() {
        setBooks((await fetchBooks()).data);
        setHasBooksFetched(true);
    }

    async function fetchQuotesFromApi() {
        let allQuotes = (await fetchQuotes()).data;
        let randomNumber = Math.floor(Math.random() * 10);
        setQuotes("❝" + allQuotes[randomNumber].text + "❞");
    }

    const handleFilter = async () => {
        let fetchedBooks = (await fetchBooks()).data;
        let filterResults = [];

        if (priceFilter === 1) {
            books.sort(function (a, b) {
                return a.bookPrice - b.bookPrice;
            });
        }
        if (priceFilter === 2) {
            books.sort(function (a, b) {
                return b.bookPrice - a.bookPrice;
            });
        }

        if (filterData.bookName || filterData.author || bookType > 0) {
            for (var item of fetchedBooks) {
                if (
                    filterData.bookName &&
                    item.bookName.match(filterData.bookName)
                ) {
                    filterResults.push(item);
                } else if (
                    filterData.author &&
                    item.bookAuthor.match(filterData.author)
                ) {
                    filterResults.push(item);
                } else if (bookType === 1 && item.previousOwnership === 0) {
                    filterResults.push(item);
                } else if (bookType === 2 && item.previousOwnership !== 0) {
                    filterResults.push(item);
                }
            }
            if (priceFilter === 1) {
                filterResults.sort(function (a, b) {
                    return a.bookPrice - b.bookPrice;
                });
            }
            if (priceFilter === 2) {
                filterResults.sort(function (a, b) {
                    return b.bookPrice - a.bookPrice;
                });
            }
            setBooks(filterResults);
        } else {
            if (priceFilter === 1) {
                books.sort(function (a, b) {
                    return a.bookPrice - b.bookPrice;
                });
            }
            if (priceFilter === 2) {
                books.sort(function (a, b) {
                    return b.bookPrice - a.bookPrice;
                });
            }
        }
        // if (filterResults.length === 0) {
        //     filterResults = [...books];
        // }
    };

    async function renderPage() {
        setLoading(true);
        await fetchFromApi();
        await fetchQuotesFromApi();
        let user = await getUserData();
        console.log(user.userEmail === "admin@gmail.com");
        setAdmin(user.userEmail === "admin@gmail.com");
        setLoading(false);
    }

    useEffect(() => {
        renderPage();
    }, [hasBooksFetched]);

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

            <Box
                position={"fixed"}
                ml={5}
                mt={10}
                bg={"black"}
                p={2}
                display={"flex"}
                alignItems={"center"}
                onClick={onOpen}
                zIndex={500}
                _hover={{ cursor: "pointer" }}
                borderRadius={10}
            >
                <Icon as={FaFilter} boxSize={5} color={"white"} />
                <Code color={"white"} bg={"black"}>
                    Filter
                </Code>
            </Box>

            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Filter your favourites</DrawerHeader>
                    <Divider />

                    <DrawerBody mt={5}>
                        <Stack gap={10}>
                            <Box>
                                <FormLabel>Search by book name</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Enter book name"
                                    onChange={handleChange}
                                    name={"bookName"}
                                />
                            </Box>

                            <Box>
                                <FormLabel>Search by author</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Enter author name"
                                    onChange={handleChange}
                                    name="author"
                                />
                            </Box>

                            <Box>
                                <FormLabel>Sort by price</FormLabel>
                                <HStack gap={3}>
                                    <Code
                                        name="sortByPrice"
                                        _hover={{ cursor: "pointer" }}
                                        userSelect={"none"}
                                        onClick={() => {
                                            if (priceFilter === 1) {
                                                setPriceFilter(0);
                                            } else {
                                                setPriceFilter(1);
                                            }
                                        }}
                                        bg={
                                            priceFilter === 1
                                                ? "green"
                                                : "#edf2f7"
                                        }
                                        color={
                                            priceFilter === 1
                                                ? "white"
                                                : "black"
                                        }
                                    >
                                        Low - High
                                    </Code>
                                    <Code
                                        _hover={{ cursor: "pointer" }}
                                        userSelect={"none"}
                                        onClick={() => {
                                            if (priceFilter === 2) {
                                                setPriceFilter(0);
                                            } else {
                                                setPriceFilter(2);
                                            }
                                        }}
                                        bg={
                                            priceFilter === 2
                                                ? "green"
                                                : "#edf2f7"
                                        }
                                        color={
                                            priceFilter === 2
                                                ? "white"
                                                : "black"
                                        }
                                    >
                                        High - low
                                    </Code>
                                </HStack>
                            </Box>

                            <Box>
                                <FormLabel>Sort by book type</FormLabel>
                                <HStack gap={3}>
                                    <Code
                                        _hover={{ cursor: "pointer" }}
                                        userSelect={"none"}
                                        onClick={() => {
                                            if (bookType === 1) {
                                                setBookType(0);
                                            } else {
                                                setBookType(1);
                                            }
                                        }}
                                        bg={
                                            bookType === 1 ? "green" : "#edf2f7"
                                        }
                                        color={
                                            bookType === 1 ? "white" : "black"
                                        }
                                    >
                                        New
                                    </Code>
                                    <Code
                                        _hover={{ cursor: "pointer" }}
                                        userSelect={"none"}
                                        onClick={() => {
                                            if (bookType === 2) {
                                                setBookType(0);
                                            } else {
                                                setBookType(2);
                                            }
                                        }}
                                        bg={
                                            bookType === 2 ? "green" : "#edf2f7"
                                        }
                                        color={
                                            bookType === 2 ? "white" : "black"
                                        }
                                    >
                                        Reselled
                                    </Code>
                                </HStack>
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter gap={2}>
                        <Button colorScheme="red" onClick={renderPage}>
                            Remove filter
                        </Button>
                        <Button
                            colorScheme="yellow"
                            onClick={handleFilter}
                            isDisabled={
                                !filterData.author &&
                                !filterData.bookName &&
                                !priceFilter &&
                                !bookType
                            }
                        >
                            Apply filter
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <Center mt={20}>
                <Code children={quotes} mt={3} />
            </Center>
            <Box
                position={"fixed"}
                zIndex={100}
                bottom={5}
                right={5}
                display={"flex"}
            >
                <Button
                    m={2}
                    bg={colors.primaryButton}
                    display={{ base: "none", md: "block" }}
                    onClick={() => {
                        navigate("/new");
                    }}
                >
                    Add new Books
                </Button>
                <Button
                    m={2}
                    bg={colors.secondaryButton}
                    display={{ base: "none", md: "block" }}
                    onClick={() => {
                        navigate("/resell");
                    }}
                >
                    Resell Books
                </Button>
                <Button
                    m={2}
                    bg={"#3CB043"}
                    display={{ base: "block", md: "none" }}
                    onClick={() => {
                        navigate("/new");
                    }}
                >
                    <Icon as={FaPlusCircle} boxSize={8} color={"white"}></Icon>
                </Button>
                <Button
                    m={2}
                    bg={"#FF7518"}
                    display={{ base: "block", md: "none" }}
                    onClick={() => {
                        navigate("/resell");
                    }}
                >
                    <Icon as={FaRecycle} boxSize={8} color={"white"}></Icon>
                </Button>
            </Box>

            <Flex
                m={{ base: "20px", md: "40px", lg: "50px" }}
                flexWrap={"wrap"}
                gap={10}
            >
                {books.length === 0 && (
                    <Box
                        display={"flex"}
                        h={"50vh"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        w={"100vw"}
                    >
                        <Stack textAlign={"center"}>
                            <Text
                                textDecoration={"underline"}
                                textDecorationColor={"red"}
                            >
                                Sorry! No books found...
                            </Text>
                        </Stack>
                    </Box>
                )}
                {hasBooksFetched &&
                    books.map((book) => {
                        return (
                            <Fragment key={book.bookId}>
                                <BookComponent
                                    book={book}
                                    renderPage={() => renderPage()}
                                    isAdmin={isAdmin}
                                ></BookComponent>
                            </Fragment>
                        );
                    })}
            </Flex>
        </Fragment>
    );
}

export default BookListsPage;
