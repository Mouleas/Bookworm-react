import { Button } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    return (
        <Fragment>
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
