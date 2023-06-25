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
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";
import { colors } from "../constants/ColorsConstants";

function BookComponent(props) {
    const {
        bookId,
        bookName,
        bookDescription,
        bookLanguage,
        bookPrice,
        bookImg,
    } = props.book;

    const navigate = useNavigate();
    return (
        <Box
            border="1.5px solid"
            borderRadius={7}
            onClick={() => {
                navigate(`/book/${bookId}`, { state: props.book });
            }}
            _hover={{
                border: "1.5px solid red",
                cursor: "pointer",
            }}
            boxShadow="2xl"
        >
            <Card>
                <CardBody>
                    <Center>
                        <Image
                            src="../../assets/images/book.png"
                            h={40}
                            w="100px"
                        />
                    </Center>
                    <Divider></Divider>
                    <Stack mt={3} spacing={3}>
                        <Heading fontSize={20}>{bookName}</Heading>
                        <Text fontSize={10} as={"div"} color={colors.paragraph}>
                            {bookDescription.substring(0, 40)}...
                            <Text color={"red"} as={"span"}>
                                ({bookLanguage})
                            </Text>
                        </Text>

                        <Text
                            fontSize={17}
                            color={colors.cost}
                            fontWeight={"semibold"}
                        >
                            ${bookPrice}
                        </Text>
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    );
}

export default BookComponent;
