import {
    GridItem,
    Center,
    Text,
    Code,
    Divider,
    Box,
    Button,
} from "@chakra-ui/react";
import React, { Fragment, useState } from "react";
import { colors } from "../constants/ColorsConstants";
import ResellBookComponent from "./ResellBookComponent";

function OrderItemComponent(props) {
    const { item } = props;
    const [openModal, setOpenModal] = useState(false);

    return (
        <Fragment>
            <GridItem
                colSpan={{ base: 4, md: 1, lg: 1 }}
                border={"0.5px solid"}
                p={5}
                borderRadius={10}
                boxShadow={"xl"}
            >
                <Box>
                    <Center display={"block"} textAlign={"left"}>
                        <Box bg={"gray.100"} borderRadius={10} p={3} mb={2}>
                            <Text fontWeight={"bold"} fontSize={25} color={""}>
                                {item.bookName}
                            </Text>

                            <Code color={"blue.500"} bg={"transparent"}>
                                by {item.bookAuthor}
                            </Code>
                            <Text fontWeight={"normal"} fontSize={15} mt={2}>
                                {item.bookLanguage}
                            </Text>
                        </Box>

                        <Text
                            fontSize={16}
                            fontWeight={"bold"}
                            mt={2}
                            color={colors.cost}
                            as={"cite"}
                        >
                            Bought each: ₹{item.bookPrice}.00
                        </Text>
                        <Code border={"1px solid green"} color={"green"} mt={2}>
                            Limit for reselling: {item.bookQuantity}
                        </Code>
                        <Divider mt={2} mb={2} borderColor={"black"}></Divider>
                        <Button
                            bg={colors.primaryButton}
                            onClick={() => {
                                setOpenModal(true);
                            }}
                        >
                            Resell
                        </Button>
                    </Center>
                </Box>
            </GridItem>
            <ResellBookComponent
                isOpen={openModal}
                isClose={() => setOpenModal(false)}
                item={item}
            />
        </Fragment>
    );
}

export default OrderItemComponent;
