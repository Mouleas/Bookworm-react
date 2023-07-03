import React, { Fragment, useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent";
import {
    Button,
    Grid,
    GridItem,
    Heading,
    Text,
    Box,
    Divider,
} from "@chakra-ui/react";
import { fetchOrderItems } from "../../api/Order/Order";
import { useParams } from "react-router";
import OrderItemComponent from "../../components/OrderItemComponent";

function OrderItemsPage() {
    const orderId = parseInt(useParams().id);
    const [orderItems, setOrderItems] = useState([]);

    async function fetchOrderItemsFromApi() {
        const response = (await fetchOrderItems(orderId)).data;
        setOrderItems(response);
    }

    useEffect(() => {
        fetchOrderItemsFromApi();
    }, []);

    return (
        <Fragment>
            <NavBarComponent />
            <Box mt={20} ml={5} mr={5} mb={5}>
                <Heading fontSize={25}>Order id: {orderId}</Heading>
            </Box>
            <Divider borderColor={"blackAlpha.400"} />
            <Grid templateColumns="repeat(4, 1fr)" gap={5} m={15}>
                {orderItems.map((orderItem, index) => {
                    return (
                        <Fragment key={index}>
                            <OrderItemComponent item={orderItem} />
                        </Fragment>
                    );
                })}
            </Grid>
        </Fragment>
    );
}

export default OrderItemsPage;
