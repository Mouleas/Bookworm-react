import { BASE_URL } from "../../constants/ApiConstants";
import axios from "axios";

export async function addUser(data) {
    return axios.post(`${BASE_URL}/UserModels`, data).catch(function (err) {
        return err;
    });
}
