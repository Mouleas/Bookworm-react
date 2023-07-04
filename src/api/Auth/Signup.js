import { BASE_URL } from "../../constants/ApiConstants";
import axios from "axios";

export async function addUser(data) {
    return axios
        .post(`${BASE_URL}/UserModels`, data)
        .then((response) => {
            axios.post(`${BASE_URL}/AddressModels`, {
                userId: response.data.userId,
                address1: "",
                address2: "",
                address3: "",
            })
        })
        .catch(function (err) {
            return err;
        });
}
