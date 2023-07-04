import { BASE_URL } from "../../constants/ApiConstants";
import axios from "axios";

export async function fetchOrders(userId) {
    return axios.get(`${BASE_URL}/OrderModels/${userId}`);
}

export async function fetchOrderItems(orderId) {
    return axios.get(`${BASE_URL}/OrderItemsModels/${orderId}`);
}

export async function postOrder(
    userId,
    dateTime,
    address,
    NumberOfItems,
    totalCost
) {
    return axios.post(`${BASE_URL}/OrderModels`, {
        orderDuration: dateTime,
        userId: userId,
        userAddress: address,
        orderStatus: "Pending",
        numberOfItems: NumberOfItems,
        totalCost: totalCost,
    });
}

export async function postOrderItem(
    orderId,
    bookName,
    bookDescription,
    bookAuthor,
    bookLanguage,
    totalPages,
    bookQuantity,
    oldPriceBook,
    publisherId,
    previousOwnership
) {
    return axios.post(`${BASE_URL}/OrderItemsModels`, {
        orderId: orderId,
        bookName: bookName,
        bookAuthor: bookAuthor,
        bookDescription: bookDescription,
        totalPages: totalPages,
        bookLanguage: bookLanguage,
        bookQuantity: bookQuantity,
        bookPrice: oldPriceBook,
        publisherId: publisherId,
        previousOwnership: previousOwnership,
    });
}
