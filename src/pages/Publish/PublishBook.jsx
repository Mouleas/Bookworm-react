import {
    Button,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Input,
    List,
    ListItem,
    Textarea,
} from "@chakra-ui/react";
import React, { Fragment, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent";
import { languages } from "../../constants/LanguageConstants";
import { matchSorter } from "match-sorter";
import { colors } from "../../constants/ColorsConstants";
import { postBooks } from "../../api/Books/Books";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function PublishBook() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [formData, setFormData] = useState({
        bookName: "",
        bookDescription: "",
        bookLanguage: "",
        bookAuthor: "",
        bookPrice: "",
        bookQuantity: "",
        totalPages: "",
        bookImg: "",
    });

    const handleQuery = (event) => {
        setQuery(event.target.value);
        let suggestionsList = matchSorter(languages, query, {
            threshold: matchSorter.rankings.WORD_STARTS_WITH,
            keys: ["name"],
        });
        setSuggestions(suggestionsList);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.bookImg) {
            postBooks(formData);
        }
        setFormData({
            bookName: "",
            bookDescription: "",
            bookLanguage: "",
            bookAuthor: "",
            bookPrice: "",
            bookQuantity: "",
            totalPages: "",
        });
        toast.success("Adding books successfull", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <Fragment>
            <NavBarComponent />
            <Heading mt={5} ml={10} mb={2}>
                Add Books
            </Heading>
            <Divider />
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Grid
                    templateColumns="repeat(2, 1fr)"
                    gap={{ base: 0, md: 10 }}
                    ml={{ base: 3, md: 10 }}
                    mr={2}
                >
                    <GridItem colSpan={{ base: 2, md: 1 }}>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Book name</FormLabel>
                            <Input
                                type="text"
                                name="bookName"
                                placeholder="Enter book name"
                                value={formData.bookName}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Book description</FormLabel>
                            <Textarea
                                placeholder="Enter book description"
                                resize={"none"}
                                h={100}
                                value={formData.bookDescription}
                                onChange={handleChange}
                                name="bookDescription"
                            ></Textarea>
                        </FormControl>

                        <FormControl isRequired mt={4}>
                            <FormLabel>Book language</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter book language"
                                name="bookLanguage"
                                value={query}
                                onChange={(event) => {
                                    handleQuery(event);
                                }}
                            />
                            <List>
                                {suggestions.length > 0 &&
                                    suggestions
                                        .slice(0, 5)
                                        .map((suggestion, index) => {
                                            return (
                                                <ListItem
                                                    key={index}
                                                    bg={"blackAlpha.300"}
                                                    borderRadius={5}
                                                    mt={1}
                                                    pl={2}
                                                    onClick={() => {
                                                        setQuery(
                                                            suggestion.name
                                                        );
                                                        setFormData({
                                                            ...formData,
                                                            bookLanguage:
                                                                suggestion.name,
                                                        });
                                                        setSuggestions([]);
                                                    }}
                                                    _hover={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    {suggestion.name}
                                                </ListItem>
                                            );
                                        })}
                            </List>
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Book Author</FormLabel>
                            <Input
                                type="text"
                                name="bookAuthor"
                                placeholder="Enter Author name"
                                value={formData.bookAuthor}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={{ base: 2, md: 1 }}>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Book price</FormLabel>
                            <Input
                                type="number"
                                name="bookPrice"
                                placeholder="Enter book price"
                                value={formData.bookPrice}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Book quantity</FormLabel>
                            <Input
                                type="number"
                                name="bookQuantity"
                                placeholder="Enter book quantity"
                                value={formData.bookQuantity}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Total pages</FormLabel>
                            <Input
                                type="number"
                                name="totalPages"
                                placeholder="Enter number of pages"
                                value={formData.totalPages}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Book image</FormLabel>
                            <Input
                                type="file"
                                name="bookImg"
                                accept="image/*"
                                onChange={handleImageChange}
                                p={1}
                            />
                        </FormControl>
                        <Button
                            mt={4}
                            bg={colors.primaryButton}
                            mb={4}
                            type="submit"
                        >
                            Add Books
                        </Button>
                    </GridItem>
                </Grid>
            </form>
        </Fragment>
    );
}

export default PublishBook;
