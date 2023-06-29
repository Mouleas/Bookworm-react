import React from "react";
import { Center, Code, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

function OrderComponent(props) {
    const { item } = props;
    const navigate = new useNavigate();
    return (
        <Grid
            templateColumns="repeat(8, 1fr)"
            gap={5}
            alignItems={"center"}
            border={"1.4px solid black"}
            m={3}
            p={3}
            boxShadow="xl"
            onClick={() => {
                navigate(`/order/${item.orderId}`);
            }}
            _hover={{ cursor: "pointer", borderColor: "red" }}
            borderRadius={10}
        >
            <GridItem
                colSpan={{ base: 4, md: 2, lg: 2 }}
                bg={"blackAlpha.400"}
                borderRadius={10}
                p={2}
            >
                <Center>
                    {item.numberOfItems > 2 && (
                        <Image
                            src="../../assets/images/stack_book.png"
                            h={{ base: "70px", md: "100px" }}
                            w={{ base: "70px" }}
                        />
                    )}
                    {item.numberOfItems === 2 && (
                        <Image
                            src="../../assets/images/twobooks.png"
                            h={{ base: "70px", md: "100px" }}
                            w={{ base: "70px" }}
                        />
                    )}
                    {item.numberOfItems === 1 && (
                        <Image
                            src="../../assets/images/onebook.png"
                            h={{ base: "70px", md: "100px" }}
                            w={{ base: "70px" }}
                        />
                    )}
                    <Code>+{item.numberOfItems} items</Code>
                </Center>
                <Center>
                    <Text fontWeight={"bold"}>₹{item.totalCost}.00</Text>
                </Center>
            </GridItem>
            <GridItem colSpan={{ base: 4, md: 2, lg: 2 }}>
                <Code bg={"transparent"}>{item.orderDuration}</Code>
            </GridItem>

            <GridItem colSpan={{ base: 8, md: 2, lg: 2 }}>
                <Code border={"none"} bg={"transparent"}>
                    {item.userAddress}
                </Code>
            </GridItem>

            <GridItem colSpan={2}>
                <Code color={"green"} border={"1px solid green"}>
                    {item.orderStatus}
                </Code>
            </GridItem>
        </Grid>
    );
}

export default OrderComponent;
