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

export async function postOrderItem(orderId, bookId, bookQuantity) {
    return axios.post(`${BASE_URL}/OrderItemsModels`, {
        orderId: orderId,
        productId: bookId,
        productQuantity: bookQuantity,
    });
}
