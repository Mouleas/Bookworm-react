import { BASE_URL } from "../../constants/ApiConstants";
import axios from "axios";

export async function fetchBooks() {
    return axios.get(`${BASE_URL}/BookModels`);
}

export async function postBooks(data) {
    return axios.post(`${BASE_URL}/BookModels`, data, {
        headers: {
            "Content-type": "multipart/form-data",
        },
    });
}
