import { BASE_URL } from "../../constants/ApiConstants";
import axios from "axios";

export async function getUser(userId) {
    return axios.get(`${BASE_URL}/UserModels/${userId}`);
}

export async function putUser(userId, data) {
    return axios.put(`${BASE_URL}/UserModels/${userId}`, data);
}
