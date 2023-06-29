import { BASE_URL } from "../../constants/ApiConstants";
import axios from "axios";

export async function fetchReviews(id) {
    return axios.get(`${BASE_URL}/ReviewModels/${id}`);
}

export async function postReview(review, bookId, userId, dateTime) {
    return axios.post(`${BASE_URL}/ReviewModels`, {
        userId: userId,
        bookId: bookId,
        review: review,
        reviewDateTime: dateTime,
    });
}
