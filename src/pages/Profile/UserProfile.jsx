import React, { Fragment, useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent";
import {
    Box,
    Button,
    Code,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Input,
} from "@chakra-ui/react";
import { colors } from "../../constants/ColorsConstants";
import { useNavigate } from "react-router";
import { fetchAddress, postAddress } from "../../api/Address/Address";
import { putUser, getUser } from "../../api/Profile/Profile";
import { getUserData, deleteUserData } from "../../secret/userInfo";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function UserProfile() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        userId: -1,
    });

    const [formData, setFormData] = useState({
        userName: "",
        userPassword: "",
        userEmail: "",
        userAccount: "",
        userPhone: "",
    });

    const [address, setAddress] = useState({
        address1: "",
        address2: "",
        address3: "",
        userId: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    async function getUserDataFromLocalStorage() {
        return await getUserData();
    }

    async function fetchAddressFromAPI(userId) {
        var response = await fetchAddress(userId);
        setAddress(response.data);
    }

    function handleSubmit(event) {
        event.preventDefault();
        putUser(userData.userId, formData);
        postAddress(userData.userId, address);
        toast.success("Changes saved", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    }

    async function renderPage() {
        let user = await getUserDataFromLocalStorage();
        setUserData({ userId: user.userId });
        user = (await getUser(user.userId)).data;
        setFormData({
            userName: user.userName,
            userPassword: user.userPassword,
            userEmail: user.userEmail,
            userAccount: user.userAccount,
            userPhone: user.userPhone,
        });
        fetchAddressFromAPI(user.userId);
    }

    function logout() {
        toast.error("Logging you out", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
        setTimeout(() => {
            deleteUserData();
            navigate("/login");
        }, 1500);
    }

    useEffect(() => {
        renderPage();
    }, []);

    return (
        <Fragment>
            <NavBarComponent />
            <ToastContainer />
            <Box
                mt={20}
                ml={{ base: 3, md: 10 }}
                display={"flex"}
                alignItems={"center"}
            >
                <Heading>Your account details</Heading>
                <Button
                    bg={"red.500"}
                    color={"white"}
                    ml={5}
                    mr={2}
                    onClick={logout}
                >
                    Logout
                </Button>
            </Box>

            <form onSubmit={handleSubmit}>
                <Grid
                    templateColumns="repeat(2, 1fr)"
                    gap={{ base: 0, md: 10 }}
                    ml={{ base: 3, md: 10 }}
                    mr={2}
                >
                    <GridItem colSpan={{ base: 2, md: 1 }}>
                        <FormControl isRequired>
                            <FormLabel mt={5}>User name</FormLabel>
                            <Input
                                type={"text"}
                                value={formData.userName}
                                onChange={handleChange}
                                name="userName"
                            />
                        </FormControl>

                        <FormLabel mt={5}>Your email</FormLabel>
                        <Input
                            type={"text"}
                            value={formData.userEmail}
                            disabled
                        />

                        <FormLabel mt={5}>Phone number</FormLabel>
                        <Input
                            type={"text"}
                            value={formData.userPhone}
                            placeholder="Enter your phone number"
                            onChange={handleChange}
                            name="userPhone"
                        />

                        <Code
                            mt={5}
                            fontSize={15}
                            mb={5}
                            display={"block"}
                            w={"fit-content"}
                        >
                            Your earnings:{" "}
                            {formData.userAccount
                                ? "₹" + formData.userAccount
                                : "₹0.00"}
                        </Code>
                    </GridItem>
                    <GridItem colSpan={{ base: 2, md: 1 }}>
                        <Heading fontSize={30}>Address</Heading>
                        <Code
                            fontSize={15}
                            mt={5}
                            bg={"red.400"}
                            color={"white"}
                        >
                            Home address
                        </Code>
                        <Input
                            type="text"
                            placeholder="Enter home address"
                            onChange={handleAddressChange}
                            name="address1"
                            value={address.address1}
                        ></Input>
                        <Code
                            fontSize={15}
                            mt={5}
                            bg={"blue.400"}
                            color={"white"}
                        >
                            Work address
                        </Code>
                        <Input
                            type="text"
                            placeholder="Enter work address"
                            onChange={handleAddressChange}
                            name="address2"
                            value={address.address2}
                        ></Input>
                        <Code
                            fontSize={15}
                            mt={5}
                            bg={"orange.400"}
                            color={"white"}
                        >
                            Other
                        </Code>
                        <Input
                            type="text"
                            placeholder="Enter address"
                            onChange={handleAddressChange}
                            name="address3"
                            value={address.address3}
                        ></Input>
                        <Button type="submit" bg={colors.primaryButton} mt={5}>
                            Save changes
                        </Button>
                        <Button
                            bg={"red.500"}
                            mt={5}
                            ml={3}
                            color={"white"}
                            onClick={() => {
                                navigate("/books");
                            }}
                        >
                            Cancel
                        </Button>
                    </GridItem>
                </Grid>
            </form>
        </Fragment>
    );
}

export default UserProfile;
