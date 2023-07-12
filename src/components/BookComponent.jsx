import {
    Card,
    CardBody,
    Image,
    Box,
    Text,
    Center,
    Stack,
    Heading,
    Divider,
    Code,
    HStack,
    Icon,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";
import { colors } from "../constants/ColorsConstants";
import { BOOK_IMAGE_URL } from "../constants/ApiConstants";
import { FaRetweet } from "react-icons/fa";
import { deleteBook } from "../api/Books/Books";

function BookComponent(props) {
    const {
        bookId,
        bookName,
        bookDescription,
        bookLanguage,
        bookPrice,
        bookImg,
        previousOwnership,
    } = props.book;

    const navigate = useNavigate();
    return (
        <Box
            border="1.5px solid"
            minWidth={{ base: "90vw", sm: 300, md: 200, lg: 190 }}
            borderRadius={7}
            maxWidth={"450px"}
            _hover={{
                border: "1.5px solid red",
                cursor: "pointer",
            }}
            boxShadow="2xl"
        >
            <Card>
                <CardBody
                    onClick={() => {
                        navigate(`/book/${bookId}`, { state: props.book });
                    }}
                >
                    <Center>
                        <Image
                            src={`${BOOK_IMAGE_URL}${bookId}${bookImg}`}
                            h={40}
                            w="100px"
                        />
                    </Center>
                    <Divider></Divider>
                    <Stack mt={3} spacing={3}>
                        <HStack>
                            <Heading fontSize={20}>{bookName}</Heading>
                            {previousOwnership !== 0 && (
                                <Icon as={FaRetweet} color={"red"} />
                            )}
                        </HStack>

                        <Text fontSize={10} as={"div"} color={colors.paragraph}>
                            {bookDescription.substring(0, 25)}...
                            <Text color={"red"} as={"span"}>
                                ({bookLanguage})
                            </Text>
                        </Text>

                        <Text
                            fontSize={17}
                            color={colors.cost}
                            fontWeight={"semibold"}
                        >
                            ₹{bookPrice}
                        </Text>
                    </Stack>
                </CardBody>
                <Code
                    display={props.isAdmin === true ? "block" : "none"}
                    p={2}
                    w={"full"}
                    textAlign={"center"}
                    bg={"red.500"}
                    color={"white"}
                    onClick={async () => {
                        await deleteBook(bookId);
                        props.renderPage();
                    }}
                >
                    Delete
                </Code>
            </Card>
        </Box>
    );
}

export default BookComponent;
