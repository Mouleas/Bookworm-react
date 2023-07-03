import {
    Box,
    Button,
    Code,
    FormControl,
    FormLabel,
    Heading,
    Image,
    Input,
    SimpleGrid,
} from "@chakra-ui/react";
import React, { Fragment, useState } from "react";
import { colors } from "../../constants/ColorsConstants";
import { useNavigate } from "react-router";
import { addUser } from "../../api/Auth/Signup";

function SignupPage() {
    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        userName: "",
        userEmail: "",
        userPassword: "",
        userPhone: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validatePassword = (e) => {
        e.preventDefault();
        return confirmPassword === formData.userPassword ? true : false;
    };

    async function addNewUser(e) {
        e.preventDefault();
        const response = await addUser(formData);
        try {
            if (response.response.data.status === 500) {
                setErrorMessage(response.response.data.detail);
                setFormData({
                    userName: "",
                    userEmail: "",
                    userPassword: "",
                    userPhone: "",
                });
                setConfirmPassword("");
            }
        } catch (e) {
            navigate("/login");
        }
    }

    return (
        <Fragment>
            <SimpleGrid columns={{ base: 1, lg: 2 }} bg={"#F5E8DF"}>
                <Box
                    ml={20}
                    mr={20}
                    alignItems={"center"}
                    h={"100vh"}
                    display={"flex"}
                    justifyContent={"center"}
                >
                    <Box w={"container.sm"}>
                        <Heading fontSize={45} mb={5}>
                            Sign up
                        </Heading>
                        <form>
                            <FormControl isRequired mt={3}>
                                <FormLabel>User name</FormLabel>
                                <Input
                                    type="text"
                                    borderColor={"black"}
                                    placeholder="Enter user name"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    name="userName"
                                />
                            </FormControl>
                            <FormControl isRequired mt={3}>
                                <FormLabel>User email</FormLabel>
                                <Input
                                    type="email"
                                    borderColor={"black"}
                                    placeholder="Enter email"
                                    value={formData.userEmail}
                                    onChange={handleChange}
                                    name="userEmail"
                                />
                            </FormControl>
                            <FormControl isRequired mt={3}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    placeholder="Enter password"
                                    borderColor={"black"}
                                    value={formData.userPassword}
                                    onChange={handleChange}
                                    name="userPassword"
                                />
                            </FormControl>
                            <FormControl isRequired mt={3}>
                                <FormLabel>Confirm password</FormLabel>
                                <Input
                                    type="password"
                                    placeholder="Re-type password"
                                    borderColor={"black"}
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                    }}
                                />
                            </FormControl>
                            {errorMessage && (
                                <Code bg={"Red"} color={"white"}>
                                    {errorMessage}
                                </Code>
                            )}

                            <Box
                                display={"flex"}
                                alignItems={"flex-end"}
                                mt={5}
                            >
                                <Button
                                    type="Submit"
                                    bg={colors.primaryButton}
                                    onClick={(e) => {
                                        if (!validatePassword(e)) {
                                            setErrorMessage(
                                                "Confirm password ≠ Password"
                                            );
                                            setConfirmPassword("");
                                        } else {
                                            addNewUser(e);
                                        }
                                    }}
                                >
                                    Sign up
                                </Button>
                                <Code
                                    ml={3}
                                    bg={"transparent"}
                                    color={"blue.600"}
                                    textDecoration={"underline"}
                                    _hover={{ cursor: "pointer" }}
                                    onClick={() => {
                                        navigate("/login");
                                    }}
                                >
                                    Already a user?
                                </Code>
                            </Box>
                        </form>
                    </Box>
                </Box>
                <Image
                    src="../../../assets/images/signup.jpg"
                    h={"100vh"}
                    display={{ base: "none", lg: "block" }}
                />
            </SimpleGrid>
        </Fragment>
    );
}

export default SignupPage;
