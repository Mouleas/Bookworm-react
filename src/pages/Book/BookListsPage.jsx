import React, { Fragment, useEffect, useState } from "react";
import { fetchBooks } from "../../api/Books/Books";
import { fetchQuotes } from "../../api/Quotes/FetchQuotes";
import {
    SimpleGrid,
    Code,
    Center,
    Text,
    Button,
    Box,
    Icon,
    Grid,
    Flex,
} from "@chakra-ui/react";
import BookComponent from "../../components/BookComponent";
import NavBarComponent from "../../components/NavBarComponent";
import { colors } from "../../constants/ColorsConstants";
import { FaPlusCircle, FaRecycle } from "react-icons/fa";
import { useNavigate } from "react-router";

function BookListsPage() {
    const [hasBooksFetched, setHasBooksFetched] = useState(false);
    const [books, setBooks] = useState([]);
    const [quotes, setQuotes] = useState("");
    const navigate = useNavigate();

    async function fetchFromApi() {
        setBooks((await fetchBooks()).data);
        setHasBooksFetched(true);
    }

    async function fetchQuotesFromApi() {
        let allQuotes = (await fetchQuotes()).data;
        let randomNumber = Math.floor(Math.random() * 10);
        setQuotes("❝" + allQuotes[randomNumber].text + "❞");
    }

    useEffect(() => {
        fetchFromApi();
        fetchQuotesFromApi();
    }, [hasBooksFetched]);

    return (
        <Fragment>
            <NavBarComponent />
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
                >
                    <Icon as={FaRecycle} boxSize={8} color={"white"}></Icon>
                </Button>
            </Box>

            <Flex
                m={{ base: "20px", md: "40px", lg: "50px" }}
                flexWrap={"wrap"}
                gap={10}
            >
                {hasBooksFetched &&
                    books.map((book) => {
                        return (
                            <Fragment key={book.bookId}>
                                <BookComponent book={book}></BookComponent>
                            </Fragment>
                        );
                    })}
            </Flex>
        </Fragment>
    );
}

export default BookListsPage;
