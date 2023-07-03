import { BASE_URL } from "../../constants/ApiConstants";
import axios from "axios";

export async function authUser(data) {
    return axios
        .post(`${BASE_URL}/UserModels/user`, data)
        .catch(function (error) {
            return error;
        });
}
