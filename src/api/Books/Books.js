import { BASE_URL } from "../../constants/ApiConstants";
import axios from "axios";

export async function fetchBooks() {
    return axios.get(`${BASE_URL}/BookModels`);
}

export async function postBooks(data, publisherId, previousOwnerShipId) {
    const bookData = {
        bookName: data.bookName,
        bookDescription: data.bookDescription,
        bookLanguage: data.bookLanguage,
        bookAuthor: data.bookAuthor,
        bookPrice: data.bookPrice,
        bookQuantity: data.bookQuantity,
        previousOwnerShip: previousOwnerShipId,
        publisherId: publisherId,
        bookImg: data.bookImg,
        totalPages: data.totalPages,
    };
    return axios.post(`${BASE_URL}/BookModels`, bookData, {
        headers: {
            "Content-type": "multipart/form-data",
        },
    });
}

export async function updateCount(bookId, quantity) {
    return axios.put(`${BASE_URL}/BookModels/${bookId}/${quantity}`);
}

export async function postReselledBooks(
    data,
    previousOwnerShipId,
    bookQuantity,
    bookPrice
) {
    const bookData = {
        bookName: data.bookName,
        bookDescription: data.bookDescription,
        bookLanguage: data.bookLanguage,
        bookAuthor: data.bookAuthor,
        bookPrice: bookPrice,
        bookQuantity: bookQuantity,
        previousOwnerShip: previousOwnerShipId,
        publisherId: data.publisherId,
        bookImg: data.bookImg,
        totalPages: data.totalPages,
    };
    return axios.post(`${BASE_URL}/BookModels`, bookData, {
        headers: {
            "Content-type": "multipart/form-data",
        },
    });
}

export async function deleteBook(bookId) {
    return axios.delete(`${BASE_URL}/BookModels/${bookId}`);
}

export async function updateBookDetails(bookId, bookData) {
    return axios.put(`${BASE_URL}/BookModels/${bookId}`, bookData);
}
