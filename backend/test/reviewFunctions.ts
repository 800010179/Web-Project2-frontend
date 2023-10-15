import expect from 'expect';
import request from 'supertest';
import { ReviewTest } from '../src/interfaces/review';


const getReviewList = (url: string | Function): Promise<ReviewTest[]> => {
    return new Promise((resolve, reject) => {
        request(url)
        .post('/graphql')
        .set('Content-type', 'application/json')
        .send({
            query: '{reviews{id likes song user rating comment title createdAt updatedAt}}',
        })
        .expect(200, (err, response) => {
            if (err) {
            reject(err);
            } else {
            const reviews = response.body.data.reviews;
            expect(reviews).toBeInstanceOf(Array);
            expect(reviews[0]).toHaveProperty('id');
            expect(reviews[0]).toHaveProperty('likes');
            expect(reviews[0]).toHaveProperty('song');
            expect(reviews[0]).toHaveProperty('user');
            expect(reviews[0]).toHaveProperty('rating');
            expect(reviews[0]).toHaveProperty('comment');
            expect(reviews[0]).toHaveProperty('title');
            expect(reviews[0]).toHaveProperty('createdAt');
            expect(reviews[0]).toHaveProperty('updatedAt');
            resolve(response.body.data.reviews);
            }
        });
    });
    };

const getReviewById = (
    url: string | Function,
    id: string
    ): Promise<ReviewTest> => {
    return new Promise((resolve, reject) => {
        request(url)
        .post('/graphql')
        .set('Content-type', 'application/json')
        .send({
            query: `query ReviewById($reviewByIdId: ID!) {
            reviewById(id: $reviewByIdId) {
                id
                likes
                rating
                title
                comment
                user {
                  id
                  username
                  email
                }
                song {
                  id
                  song_name
                  thumbnail
                  artist
                  album
                  genres
                  api_id
                }
                createdAt
                updatedAt
            }
            }`,
            variables: {
            reviewByIdId: id,
            },
        })
        .expect(200, (err, response) => {
            if (err) {
            reject(err);
            } else {
            const review = response.body.data.reviewById;
            expect(review.id).toBe(id);
            expect(review).toHaveProperty('likes');
            expect(review).toHaveProperty('song');
            expect(review).toHaveProperty('user');
            expect(review).toHaveProperty('rating');
            expect(review).toHaveProperty('comment');
            expect(review).toHaveProperty('title');
            expect(review).toHaveProperty('createdAt');
            expect(review).toHaveProperty('updatedAt');
            resolve(response.body.data.reviewById);
            }
        });
    });
    };

    const postReview = (
        url: string | Function,
        title: string,
        comment: string,
        rating: number,
        song: string,
        token: string
    ): Promise<ReviewTest> => {
       
        return new Promise((resolve, reject) => {
            request(url)
                .post('/graphql')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    query: `
                    mutation CreateReview($rating: Float!, $comment: String!, $title: String!, $song: ID!) {
                        createReview(rating: $rating, comment: $comment, title: $title, song: $song) {
                                id
                                likes
                                rating
                                title
                                comment
                                user {
                                    id
                                    username
                                    email
                                }
                                song {
                                    id
                                    song_name
                                    thumbnail
                                    artist
                                    album
                                    genres
                                    api_id
                                }
                                createdAt
                                updatedAt
                            }
                        }
                    `,
                    
                    variables: {
                        rating: rating,
                        comment: comment,
                        title: title,
                        song: song,
                    },
                })
                .expect(200, (err, response) => {
                    if (err) {
                      
                        reject(err);
                    } else {
                       
                        const createdReview = response.body.data.createReview;
                        expect(createdReview).toHaveProperty('id');
                        expect(createdReview).toHaveProperty('likes');
                        expect(createdReview).toHaveProperty('song');
                        expect(createdReview).toHaveProperty('user');
                        expect(createdReview).toHaveProperty('rating');
                        expect(createdReview).toHaveProperty('comment');
                        expect(createdReview).toHaveProperty('title');
                        expect(createdReview).toHaveProperty('createdAt');
                        expect(createdReview).toHaveProperty('updatedAt');
                        resolve(createdReview);
                    }
                });
        });
    };

const deleteReview = (
    url: string | Function,
    id: string,
    token: string
    ): Promise<ReviewTest> => {
        return new Promise((resolve, reject) => {
            request(url)
            .post('/graphql')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-type', 'application/json')
            .send({
                query: `mutation DeleteReview($deleteReviewId: ID!) {
                deleteReview(id: $deleteReviewId) {
                    id
                    likes
                    rating
                    title
                    comment
                    user {
                    id
                    username
                    email
                    }
                    song {
                    id
                    song_name
                    thumbnail
                    artist
                    album
                    genres
                    api_id
                    }
                    createdAt
                    updatedAt
                }
                }`,
                variables: {
                deleteReviewId: id,
                },
            })
            .expect(200, (err, response) => {
                if (err) {
                reject(err);
                } else {
                const review = response.body.data.deleteReview;
                expect(review).toHaveProperty('id');
                expect(review).toHaveProperty('likes');
                expect(review).toHaveProperty('song');
                expect(review).toHaveProperty('user');
                expect(review).toHaveProperty('rating');
                expect(review).toHaveProperty('comment');
                expect(review).toHaveProperty('title');
                expect(review).toHaveProperty('createdAt');
                expect(review).toHaveProperty('updatedAt');
                resolve(response.body.data.deleteReview);
                }
            });
        }
    );
}

const updateReview = (
    url: string | Function,
    id: string,
    rating: number,
    title: string,
    comment: string,
    token: string
    ): Promise<ReviewTest> => {
    return new Promise((resolve, reject) => {
        request(url)
        .post('/graphql')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/json')
        .send({
            query: `mutation Mutation($updateReviewId: ID!, $rating: Float, $title: String, $comment: String) {
                updateReview(id: $updateReviewId, rating: $rating, title: $title, comment: $comment) {
                id
                likes
                rating
                title
                comment
                user {
                  id
                  username
                  email
                }
                song {
                  id
                  song_name
                  thumbnail
                  artist
                  album
                  genres
                  api_id
                }
                createdAt
                updatedAt
            }
            }`,
            variables: {
            updateReviewId: id,
            rating: rating,
            title: title,
            comment: comment
            },
        })
        .expect(200, (err, response) => {
            if (err) {
            reject(err);
            } else {
            const review = response.body.data.updateReview;
            expect(review).toHaveProperty('id');
            expect(review).toHaveProperty('likes');
            expect(review).toHaveProperty('song');
            expect(review).toHaveProperty('user');
            expect(review).toHaveProperty('rating');
            expect(review).toHaveProperty('comment');
            expect(review).toHaveProperty('title');
            expect(review).toHaveProperty('createdAt');
            expect(review).toHaveProperty('updatedAt');
            resolve(response.body.data.updateReview);
            }
        });
    });
    }

const likeReview = (url: string | Function, id: string, token: string): Promise<ReviewTest> => {
    return new Promise((resolve, reject) => {
        request(url)
        .post('/graphql')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/json')
        .send({
            query: `mutation LikeReview($likeReviewId: ID!) {
            likeReview(id: $likeReviewId) {
                id
                likes
                rating
                title
                comment
                user {
                  id
                  username
                  email
                }
                song {
                  id
                  song_name
                  thumbnail
                  artist
                  album
                  genres
                  api_id
                }
                createdAt
                updatedAt
            }
            }`,
            variables: {
            likeReviewId: id,
            },
        })
        .expect(200, (err, response) => {
            if (err) {
            reject(err);
            } else {
            const review = response.body.data.likeReview;
            expect(review).toHaveProperty('id');
            expect(review).toHaveProperty('likes');
            expect(review).toHaveProperty('song');
            expect(review).toHaveProperty('user');
            expect(review).toHaveProperty('rating');
            expect(review).toHaveProperty('comment');
            expect(review).toHaveProperty('title');
            expect(review).toHaveProperty('createdAt');
            expect(review).toHaveProperty('updatedAt');
            resolve(response.body.data.likeReview);
            }
        });
    });
    }

    export { getReviewList, getReviewById, postReview, deleteReview, updateReview, likeReview };
        