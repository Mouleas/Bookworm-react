import { BASE_URL } from "../../constants/ApiConstants";
import axios from "axios";

export async function fetchCart(id) {
    return axios.get(`${BASE_URL}/CartModels/${id}`);
}

export async function incrementItem(id) {
    return axios.get(`${BASE_URL}/CartModels/${id}/1`);
}

export async function decrementItem(id) {
    return axios.get(`${BASE_URL}/CartModels/${id}/0`);
}

export async function postCart(userId, bookId, bookQuantity) {
    axios.post(`${BASE_URL}/CartModels`, {
        userId: userId,
        bookId: bookId,
        bookQuantity: bookQuantity,
    });
}

export async function deleteCartItem(cartId) {
    axios.delete(`${BASE_URL}/CartModels/${cartId}`);
}
