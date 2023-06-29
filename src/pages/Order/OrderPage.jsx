import React, { Fragment, useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent";

import OrderComponent from "../../components/OrderComponent";
import { Grid, GridItem, Heading } from "@chakra-ui/react";
import { fetchOrders } from "../../api/Order/Order";

function OrderPage() {
    const [orders, setOrders] = useState([]);

    async function fetchOrderFromApi(userId) {
        let response = (await fetchOrders(userId)).data;
        setOrders(response);
    }

    useEffect(() => {
        fetchOrderFromApi(3);
    }, []);

    return (
        <Fragment>
            <NavBarComponent />
            <Heading p={5}>Your orders</Heading>
            <Grid
                templateColumns="repeat(8, 1fr)"
                gap={5}
                alignItems={"center"}
            >
                <GridItem colSpan={8}>
                    {orders.toReversed().map((order, index) => {
                        return (
                            <Fragment key={index}>
                                <OrderComponent item={order} />
                            </Fragment>
                        );
                    })}
                </GridItem>
            </Grid>
        </Fragment>
    );
}

export default OrderPage;
