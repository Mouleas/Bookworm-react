import React, { Fragment, useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent";
import { Box, Divider, Grid, Heading } from "@chakra-ui/react";
import OrderItemComponent from "../../components/OrderItemComponent";
import { getUserData } from "../../secret/userInfo";
import { getAllResellableBooks } from "../../api/ResellBook/ResellBook";

function ResellBook() {
    const [orderItems, setOrderItems] = useState([]);

    async function fetchAllResellableBooks() {
        let user = await getUserData();
        let response = await getAllResellableBooks(user.userId);
        setOrderItems(response);
    }

    useEffect(() => {
        fetchAllResellableBooks();
    }, []);
    return (
        <Fragment>
            <NavBarComponent />
            <Box mt={20} ml={5} mr={5} mb={5}>
                <Heading fontSize={25}>Resell your books</Heading>
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

export default ResellBook;
