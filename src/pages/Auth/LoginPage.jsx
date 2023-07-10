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
    Spinner,
} from "@chakra-ui/react";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../constants/ColorsConstants";
import { authUser } from "../../api/Auth/Login";
import { setUserData } from "../../secret/userInfo";

function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userEmail: "",
        userPassword: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const response = await authUser(formData);
        try {
            if (response.response.data.status === 500) {
                setErrorMessage(response.response.data.detail);
                setFormData({
                    userEmail: "",
                    userPassword: "",
                });
            }
        } catch (e) {
            setUserData(response.data);
            navigate("/books");
        }
        setLoading(false);
    };

    return (
        <Fragment>
            {loading && (
                <Box
                    position={"fixed"}
                    zIndex={300}
                    h={"100vh"}
                    w={"100vw"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    bg={"white"}
                >
                    <Spinner size={"lg"} />
                </Box>
            )}
            <SimpleGrid columns={{ base: 1, lg: 2 }} bg={"#EFFAFC"}>
                <Box
                    ml={20}
                    mr={20}
                    alignItems={"center"}
                    h={"100vh"}
                    display={"flex"}
                    justifyContent={"center"}
                >
                    <Box w={"container.sm"}>
                        <Heading mb={5} fontSize={45}>
                            Sign in
                        </Heading>
                        <form>
                            <FormControl isRequired>
                                <FormLabel>User email</FormLabel>
                                <Input
                                    type="email"
                                    placeholder="Enter email"
                                    borderColor={"black"}
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
                                    onClick={handleSubmit}
                                >
                                    Sign in
                                </Button>
                                <Code
                                    ml={3}
                                    bg={"transparent"}
                                    color={"blue.600"}
                                    textDecoration={"underline"}
                                    _hover={{ cursor: "pointer" }}
                                    onClick={() => {
                                        navigate("/signup");
                                    }}
                                >
                                    New user?
                                </Code>
                            </Box>
                        </form>
                    </Box>
                </Box>

                <Image
                    src="../../../assets/images/login.jpg"
                    h={"100vh"}
                    display={{ base: "none", lg: "block" }}
                />
            </SimpleGrid>
        </Fragment>
    );
}

export default LoginPage;
