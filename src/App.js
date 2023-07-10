import React, { Fragment, useEffect } from "react";
import LoginPage from "./pages/Auth/LoginPage";
import { getUserData } from "./secret/userInfo";
import { useNavigate } from "react-router";

function App() {
    let navigate = useNavigate();
    useEffect(() => {
        let user = getUserData();
        user.then((res) => {
            if (res !== 0) {
                navigate("/books");
            } else {
                navigate("/login");
            }
        });
    }, []);
    return <Fragment></Fragment>;
}

export default App;
