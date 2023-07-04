import { BASE_URL } from "../../constants/ApiConstants";
import axios from "axios";

export async function getAllResellableBooks(userId) {
    let allResellableBooks = [];
    let orders = await axios
        .get(`${BASE_URL}/OrderModels/${userId}`)
        .then((response) => {
            return response.data;
        });

    for (var order of orders) {
        let orderItems = await axios
            .get(`${BASE_URL}/OrderItemsModels/${order.orderId}`)
            .then((response) => {
                return response.data;
            });
        for (var orderItem of orderItems) {
            allResellableBooks.push(orderItem);
        }
    }
    console.log(allResellableBooks);
    return allResellableBooks;
}
