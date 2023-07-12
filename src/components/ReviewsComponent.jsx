import {
    Box,
    Divider,
    GridItem,
    Heading,
    Text,
    Textarea,
    Grid,
    Button,
    Center,
    Code,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { colors } from "../constants/ColorsConstants";
import { fetchReviews, postReview, deleteReview } from "../api/Reviews/Reviews";
import { useParams } from "react-router";
import { getUserData } from "../secret/userInfo";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function ReviewsComponent() {
    const [reviews, setReviews] = useState([]);
    const [userReview, setUserReview] = useState("");
    const [user, setUser] = useState({
        userId: -1,
    });

    const bookId = parseInt(useParams().id);

    async function fetchReviewsFromApi(bookId) {
        let userData = await getUserData();
        setUser({ userId: userData.userId });
        let fetchedReviews = (await fetchReviews(bookId)).data;
        setReviews(fetchedReviews.reverse());
    }

    const popToast = (message) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    };

    const submitReview = async () => {
        if (userReview.length === 0) return;

        await postReview(
            userReview,
            bookId,
            user.userId,
            "" + new Date().toLocaleString()
        );
        await fetchReviewsFromApi(bookId);
        setUserReview("");
        popToast("Thank you for the feedback");
    };

    useEffect(() => {
        fetchReviewsFromApi(bookId);
    }, []);

    return (
        <Fragment>
            <Box m={5}>
                <Grid
                    templateColumns="repeat(2, 1fr)"
                    gap={4}
                    m={{ base: 0, sm: 0, md: 20, lg: 20 }}
                >
                    <GridItem
                        colSpan={{ base: 2, sm: 2, md: 1, lg: 1 }}
                        bg={colors.reviewBox}
                        p={10}
                        borderRadius={10}
                    >
                        <Heading
                            fontSize={30}
                            display={{
                                base: "none",
                                sm: "none",
                                md: "block",
                                lg: "block",
                            }}
                        >
                            Review this Book
                        </Heading>
                        <Textarea
                            border={"solid 1px black"}
                            _hover={{ border: "solid 1px black" }}
                            placeholder="Share your thoughts..."
                            mt={5}
                            mb={5}
                            h={{
                                base: "60px",
                                sm: "60px",
                                md: "100px",
                                lg: "120px",
                            }}
                            resize={"none"}
                            bg={"white"}
                            onChange={(e) => {
                                setUserReview(e.target.value);
                            }}
                            value={userReview}
                        ></Textarea>
                        <Button
                            bg={colors.secondaryButton}
                            _hover={{
                                border: `solid 1px ${colors.secondaryButton}`,
                                backgroundColor: "transparent",
                            }}
                            onClick={submitReview}
                        >
                            Submit
                        </Button>
                    </GridItem>
                    <GridItem
                        colSpan={{ base: 2, sm: 2, md: 1, lg: 1 }}
                        h={300}
                        overflowY={"scroll"}
                        overflowX={"wrap"}
                        border={"1px solid #d7e8ea"}
                        p={5}
                        borderRadius={10}
                    >
                        <Heading fontSize={30} ml={1}>
                            All reviews
                        </Heading>
                        {reviews.length === 0 && (
                            <Center>
                                <Text mt={10}>No reviews...</Text>
                            </Center>
                        )}
                        {reviews.length > 0 &&
                            reviews.map((review) => {
                                return (
                                    <Fragment key={review.reviewId}>
                                        <Box
                                            p={4}
                                            mt={2}
                                            bg={colors.reviewBox}
                                            borderRadius={5}
                                        >
                                            <Box
                                                display={"flex"}
                                                justifyContent={"space-between"}
                                                alignItems={"center"}
                                            >
                                                <Text
                                                    fontWeight={"bold"}
                                                    color={colors.userName}
                                                >
                                                    {review.user.userName}
                                                </Text>

                                                {user.userId ===
                                                    review.user.userId && (
                                                    <Text
                                                        color={"white"}
                                                        fontSize={14}
                                                        _hover={{
                                                            cursor: "pointer",
                                                        }}
                                                        pl={2}
                                                        pr={2}
                                                        backgroundColor={"red"}
                                                        borderRadius="50%"
                                                        onClick={() => {
                                                            deleteReview(
                                                                review.reviewId
                                                            ).then(() => {
                                                                fetchReviewsFromApi(
                                                                    bookId
                                                                ).then(() => {
                                                                    popToast(
                                                                        "Review deleted successfully"
                                                                    );
                                                                });
                                                            });
                                                        }}
                                                    >
                                                        x
                                                    </Text>
                                                )}
                                            </Box>

                                            <Code color={"black"} fontSize={12}>
                                                Reviewed on
                                                {" " + review.reviewDateTime}
                                            </Code>
                                            <Text color={colors.paragraph}>
                                                {review.review}
                                            </Text>

                                            <Divider mt={2}></Divider>
                                        </Box>
                                    </Fragment>
                                );
                            })}
                    </GridItem>
                </Grid>
            </Box>
        </Fragment>
    );
}

export default ReviewsComponent;
