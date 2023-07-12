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
        orderStatus: "Order successfull",
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

export async function insertOrderItems(orderId, cartItems) {
    var orderItems = [];
    for (var cartItem of cartItems) {
        const orderItem = {
            orderId: orderId,
            bookName: cartItem.book.bookName,
            bookAuthor: cartItem.book.bookAuthor,
            bookDescription: cartItem.book.bookDescription,
            totalPages: cartItem.book.totalPages,
            bookLanguage: cartItem.book.bookLanguage,
            bookQuantity: cartItem.bookQuantity,
            bookPrice: cartItem.book.bookPrice,
            publisherId: cartItem.book.publisherId,
            previousOwnership: cartItem.book.previousOwnership,
        };
        orderItems.push(orderItem);
    }
    return axios.post(`${BASE_URL}/OrderItemsModels/orderItems`, orderItems);
}

export async function updateOrderItemQuantity(orderItemsId, quantity) {
    return axios.put(
        `${BASE_URL}/OrderItemsModels/${orderItemsId}/${quantity}`
    );
}
