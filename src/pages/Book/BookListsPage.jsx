import React, { Fragment, useEffect, useState } from "react";
import { fetchBooks } from "../../api/FetchBooks";
import { fetchQuotes } from "../../api/FetchQuotes";
import { SimpleGrid, Code, Center } from "@chakra-ui/react";
import BookComponent from "../../components/BookComponent";
import NavBarComponent from "../../components/NavBarComponent";

function BookListsPage() {
    const [hasBooksFetched, setHasBooksFetched] = useState(false);
    const [books, setBooks] = useState([]);
    const [quotes, setQuotes] = useState("");

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
            <Center mt={3}>
                <Code children={quotes} mt={3} />
            </Center>
            <SimpleGrid
                column={4}
                spacing={10}
                minChildWidth={200}
                m={{ base: "20px", md: "40px", lg: "50px" }}
            >
                {hasBooksFetched &&
                    books.map((book) => {
                        return (
                            <Fragment key={book.bookId}>
                                <BookComponent book={book}></BookComponent>
                            </Fragment>
                        );
                    })}
            </SimpleGrid>
        </Fragment>
    );
}

export default BookListsPage;
