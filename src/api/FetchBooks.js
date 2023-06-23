import { BASE_URL } from "../constants/ApiConstants";
import axios from "axios";

export async function fetchBooks() {
    return axios.get(`${BASE_URL}/BookModels`);
}
