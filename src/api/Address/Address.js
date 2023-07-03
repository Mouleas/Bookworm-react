import { BASE_URL } from "../../constants/ApiConstants";
import axios from "axios";

export async function fetchAddress(userId) {
    return axios
        .get(`${BASE_URL}/AddressModels/${userId}`)
        .catch(function (err) {
            return err;
        });
}

export async function postAddress(userId, data) {
    return axios.put(`${BASE_URL}/AddressModels/${userId}`, data);
}
