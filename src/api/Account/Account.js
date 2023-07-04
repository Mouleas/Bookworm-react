import { BASE_URL } from "../../constants/ApiConstants";
import axios from "axios";

export async function updateAccount(data) {
    return axios.put(`${BASE_URL}/UserModels/user/1`, data);
}
