import { Flex, Heading, Icon, Link, LinkBox } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { FaShoppingCart, FaUserAlt, FaBoxOpen } from "react-icons/fa";
import { colors } from "../constants/ColorsConstants";

function NavBarComponent() {
    const LinkStyle = {
        textDecoration: "none",
    };
    return (
        <Fragment>
            <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                bg={colors.navBar}
                color={"#fff"}
                pt={2}
                pl={2}
                pr={5}
                pb={2}
                position={"fixed"}
                w={"100vw"}
                top={0}
                zIndex={200}
            >
                <Heading
                    fontSize={{
                        base: "15px",
                        sm: "20px",
                        md: "25px",
                        lg: "30px",
                    }}
                    ml={5}
                >
                    <Link href="/books" _hover={LinkStyle}>
                        Bookworm.com
                    </Link>
                </Heading>
                <LinkBox>
                    <Link _hover={LinkStyle} m={3} href="/orders">
                        <Icon as={FaBoxOpen} boxSize={5}></Icon>
                    </Link>
                    <Link _hover={LinkStyle} m={3} href="/cart">
                        <Icon as={FaShoppingCart} boxSize={5}></Icon>
                    </Link>
                    <Link _hover={LinkStyle} m={3} href="/profile">
                        <Icon as={FaUserAlt} boxSize={5}></Icon>
                    </Link>
                </LinkBox>
            </Flex>
        </Fragment>
    );
}

export default NavBarComponent;
