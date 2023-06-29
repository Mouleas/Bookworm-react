import {
    GridItem,
    Center,
    Text,
    Image,
    Code,
    Divider,
    Flex,
    Box,
    Button,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import { colors } from "../constants/ColorsConstants";

function OrderItemComponent(props) {
    const { item } = props;
    return (
        <Fragment>
            <GridItem
                colSpan={{ base: 4, md: 2, lg: 2 }}
                bg={"blackAlpha.300"}
                p={5}
            >
                <Flex
                    justifyContent={{
                        base: "space-between",
                        md: "space-evenly",
                    }}
                    alignItems={"center"}
                >
                    <Image
                        src="../../assets/images/book.png"
                        h={{ base: "130px", md: "200px" }}
                        w={{ base: "100px", md: "150px" }}
                    />
                    <Box>
                        <Center display={"block"} textAlign={"left"}>
                            <Text fontWeight={"bold"} fontSize={25}>
                                {item.book.bookName}
                            </Text>
                            <Code bg={"transparent"}>
                                by {item.book.bookAuthor}
                            </Code>
                            <Text fontSize={16} fontWeight={"bold"} mt={3}>
                                Cost's each: ₹{item.book.bookPrice}.00
                            </Text>
                            <Code
                                border={"1px solid green"}
                                color={"green"}
                                mt={2}
                            >
                                Limit: {item.productQuantity}
                            </Code>
                            <Divider
                                mt={2}
                                mb={2}
                                borderColor={"black"}
                            ></Divider>
                            <Button bg={colors.primaryButton}>Resell</Button>
                        </Center>
                    </Box>
                </Flex>
            </GridItem>
        </Fragment>
    );
}

export default OrderItemComponent;
