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
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useLocation } from "react-router";
import { colors } from "../../constants/ColorsConstants";
import NavBarComponent from "../../components/NavBarComponent";
import ReviewsComponent from "../../components/ReviewsComponent";
import { postCart } from "../../api/Cart/Cart";

function BookDetailPage() {
    const { state } = useLocation();
    const {
        bookId,
        bookName,
        bookDescription,
        bookLanguage,
        bookPrice,
        totalPages,
        bookImg,
    } = state;
    return (
        <Fragment>
            <NavBarComponent />
            <Grid
                templateColumns="repeat(4, 1fr)"
                gap={4}
                m={{ base: 5, sm: 5, md: 20, lg: 20 }}
            >
                <GridItem colSpan={{ base: 4, sm: 1, md: 1, lg: 1 }}>
                    <Center>
                        <Image src="../../assets/images/book.png" h={300} />
                    </Center>
                </GridItem>
                <GridItem
                    colSpan={{ base: 4, sm: 3, md: 3, lg: 3 }}
                    border="1px solid"
                >
                    <Stack m={{ base: 3, sm: 3, md: 10, lg: 10 }} spacing={3}>
                        <Heading>{bookName}</Heading>
                        <Text color={colors.paragraph}>{bookDescription}</Text>
                        <Text color={"red"}>{bookLanguage}</Text>
                        <Text>Total pages: {totalPages}</Text>
                        <Text
                            color={colors.cost}
                            fontWeight={"semibold"}
                            fontSize={30}
                        >
                            ${bookPrice}
                        </Text>
                        <Divider></Divider>
                        <Button
                            width={40}
                            bg={colors.primaryButton}
                            fontWeight={"normal"}
                            onClick={() => {
                                postCart(3, bookId, 1);
                            }}
                        >
                            Add to cart
                        </Button>
                    </Stack>
                </GridItem>
            </Grid>
            <ReviewsComponent />
        </Fragment>
    );
}

export default BookDetailPage;
