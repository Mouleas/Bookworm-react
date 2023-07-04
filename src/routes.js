import { createBrowserRouter } from "react-router-dom";

import BookListsPage from "./pages/Book/BookListsPage";
import BookDetailPage from "./pages/Book/BookDetailPage";
import CartPage from "./pages/Cart/CartPage";
import App from "./App";
import OrderPage from "./pages/Order/OrderPage";
import OrderItemsPage from "./pages/Order/OrderItemsPage";
import PublishBook from "./pages/Publish/PublishBook";
import SignupPage from "./pages/Auth/SignupPage";
import LoginPage from "./pages/Auth/LoginPage";
import UserProfile from "./pages/Profile/UserProfile";
import ResellBook from "./pages/ResellBook/ResellBook";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },
    {
        path: "/books",
        element: <BookListsPage />,
    },
    {
        path: "/book/:id",
        element: <BookDetailPage />,
    },
    {
        path: "/cart",
        element: <CartPage />,
    },
    {
        path: "/orders",
        element: <OrderPage />,
    },
    {
        path: "/order/:id",
        element: <OrderItemsPage />,
    },
    {
        path: "/new",
        element: <PublishBook />,
    },
    {
        path: "/profile",
        element: <UserProfile />,
    },
    {
        path: "/resell",
        element: <ResellBook />,
    },
]);
