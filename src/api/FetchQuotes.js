import { QUOTES_BASE_URL } from "../constants/ApiConstants";
import axios from "axios";

export async function fetchQuotes() {
    return axios.get(`${QUOTES_BASE_URL}`);
}
