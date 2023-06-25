import { BASE_URL } from "../../constants/ApiConstants";
import axios from "axios";

export async function fetchReviews() {
    return axios.get(`${BASE_URL}/ReviewModels`);
}

export async function postReview(review, bookId, userId, dateTime) {
    axios.post(`${BASE_URL}/ReviewModels`, {
        userId: userId,
        bookId: bookId,
        review: review,
        reviewDateTime: dateTime,
    });
}
