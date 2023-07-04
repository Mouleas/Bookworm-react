import {
    Box,
    Button,
    Code,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { colors } from "../constants/ColorsConstants";
import { getUserData } from "../secret/userInfo";
import { postReselledBooks } from "../api/Books/Books";

function ResellBookComponent(props) {
    const { item } = props;
    const [formData, setFormData] = useState(item);
    const [ImageURI, setImageURI] = useState("");
    const [totalBooks, setTotalBooks] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");

    const handleBookCountChange = (num) => {
        let bookCount = totalBooks + num;
        if (bookCount > item.bookQuantity) {
            bookCount = item.bookQuantity;
        } else if (bookCount < 1) {
            bookCount = 1;
        }
        setTotalBooks(bookCount);
    };

    function getResellPrice(actualPrice) {
        let lessedPrice = actualPrice * 0.2;
        return totalBooks * (actualPrice - lessedPrice);
    }

    const handleImageChange = (e) => {
        setFormData({ ...formData, bookImg: e.target.files[0] });
    };

    const handleSubmit = async () => {
        if (!formData.bookImg) {
            setErrorMessage("Please attach a book image");
        } else {
            setErrorMessage("");
            let user = (await getUserData()).userId;
            postReselledBooks(
                formData,
                user,
                totalBooks,
                getResellPrice(item.bookPrice)
            );
            props.isClose();
        }
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onClose={() => {
                setImageURI("");
                setFormData({ ...formData, bookImg: "" });
                setTotalBooks(1);
                props.isClose();
            }}
            size={"xl"}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Resell your books</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Box>
                        <Flex justifyContent={"space-around"}>
                            <Box p={3}>
                                <Code bg={"transparent"}>
                                    Upload book photo
                                </Code>

                                <Image src={`${ImageURI}`} h={40} w="100px" />

                                <FormControl isRequired>
                                    <Input
                                        name="bookImg"
                                        type="file"
                                        fontSize={10}
                                        size={"100px"}
                                        onChange={(event) => {
                                            setImageURI(
                                                URL.createObjectURL(
                                                    event.target.files[0]
                                                )
                                            );
                                            handleImageChange(event);
                                        }}
                                    />
                                </FormControl>
                                {errorMessage && (
                                    <Code
                                        border={"0.5px solid red"}
                                        fontSize={11}
                                        color={"red"}
                                    >
                                        *{errorMessage}
                                    </Code>
                                )}
                            </Box>
                            <Box>
                                <Stack>
                                    <Code>Book name: {item.bookName}</Code>
                                    <Code>Book author: {item.bookAuthor}</Code>
                                    <Code>
                                        Book Language: {item.bookLanguage}
                                    </Code>
                                    <Code>Total pages: {item.totalPages}</Code>
                                    <Code mt={3} textAlign={"center"}>
                                        Total books
                                    </Code>
                                </Stack>
                                <HStack justifyContent={"center"}>
                                    <Text
                                        pl={2}
                                        pr={2}
                                        bg={"red.200"}
                                        name="bookQuantity"
                                        onClick={() => {
                                            handleBookCountChange(-1);
                                        }}
                                        _hover={{ cursor: "pointer" }}
                                    >
                                        -
                                    </Text>
                                    <Text pl={2} pr={2}>
                                        {totalBooks}
                                    </Text>
                                    <Text
                                        pl={2}
                                        pr={2}
                                        bg={"green.300"}
                                        onClick={() => {
                                            handleBookCountChange(1);
                                        }}
                                        name="bookQuantity"
                                        _hover={{ cursor: "pointer" }}
                                    >
                                        +
                                    </Text>
                                </HStack>
                                <Code
                                    bg={"green.500"}
                                    display={"block"}
                                    textAlign={"center"}
                                    mt={3}
                                    color={"white"}
                                >
                                    Congrats! You will get ₹
                                    {getResellPrice(item.bookPrice)}
                                    .00
                                </Code>
                            </Box>
                        </Flex>
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Text color={colors.cost} fontSize={"15px"} pr={4}>
                        *You bought this book for each ₹{item.bookPrice}
                    </Text>
                    <Button
                        bg={colors.primaryButton}
                        mr={3}
                        onClick={handleSubmit}
                    >
                        Resell
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ResellBookComponent;
