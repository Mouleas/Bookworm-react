import { Button } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import NavBarComponent from "../../components/NavBarComponent";

function LoginPage() {
    const navigate = useNavigate();
    return (
        <Fragment>
            <NavBarComponent />
            <div>LoginPage</div>
            <Button
                colorScheme="teal"
                onClick={() => {
                    navigate("/books");
                }}
            >
                Click me
            </Button>
        </Fragment>
    );
}

export default LoginPage;
