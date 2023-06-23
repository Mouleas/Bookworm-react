import { createBrowserRouter } from "react-router-dom";

import LoginPage from "./pages/Auth/LoginPage";
import BookListsPage from "./pages/Book/BookListsPage";
import BookDetailPage from "./pages/Book/BookDetailPage";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/books",
        element: <BookListsPage />,
    },
    {
        path: "/book/:id",
        element: <BookDetailPage></BookDetailPage>,
    },
]);
