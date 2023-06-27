import { createBrowserRouter } from "react-router-dom";

import BookListsPage from "./pages/Book/BookListsPage";
import BookDetailPage from "./pages/Book/BookDetailPage";
import CartPage from "./pages/Cart/CartPage";
import App from "./App";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
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
]);
