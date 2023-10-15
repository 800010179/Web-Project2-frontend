import Review from "../interfaces/Review";
import { gql, GraphQLClient } from "graphql-request";
export async function getReviewsBySong(songId: string): Promise<Review[]> {
    try {
        const API_URL = process.env.REACT_APP_API_URL
        const reviewsQuery = gql`
            query reviewsBySong($songId: ID!) {
                reviewsBySong(songId: $songId) {
                    id
                    title
                    comment
                    rating
                    song {
                        song_name
                        thumbnail
                        genres
                        album
                        artist
                    }
                    likes
                    user {
                        id
                        username
                        email
                    }
                    createdAt
                    updatedAt
                }
            }
        `;
        const graphQLClient = new GraphQLClient(API_URL || "", {});
        const variables = {
            songId: songId
        };
        const data: any = await graphQLClient.request(reviewsQuery, variables);
        const reviews: Review[] = data.reviewsBySong;
        return reviews;

    }catch(error) {
        console.error(error)
    }
    return {} as Review[];
}