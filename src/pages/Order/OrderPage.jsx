import React, { Fragment, useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent";

import OrderComponent from "../../components/OrderComponent";
import { Grid, GridItem, Heading } from "@chakra-ui/react";
import { fetchOrders } from "../../api/Order/Order";
import { getUserData } from "../../secret/userInfo";

function OrderPage() {
    const [orders, setOrders] = useState([]);

    async function fetchOrderFromApi() {
        let user = await getUserData();
        let response = (await fetchOrders(user.userId)).data;
        setOrders(response);
    }

    useEffect(() => {
        fetchOrderFromApi();
    }, []);

    return (
        <Fragment>
            <NavBarComponent />
            <Heading mt={20} pl={5}>
                Your orders
            </Heading>
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
