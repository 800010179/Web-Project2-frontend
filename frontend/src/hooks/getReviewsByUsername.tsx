import Review from "../interfaces/Review";
import { gql, GraphQLClient } from "graphql-request";
export async function getReviewsByUsername(username: string): Promise<Review[]> {
    try {
        const API_URL = process.env.REACT_APP_API_URL
        const reviewsQuery = gql`
        query Query($username: String!) {
            reviewsByUsername(username: $username) {
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
        `;
        const graphQLClient = new GraphQLClient(API_URL || "", {});
        const variables = {
            username: username
        };
        const data: any = await graphQLClient.request(reviewsQuery, variables);
        const reviews: Review[] = data.reviewsBySong;
        return reviews;

    }catch(error) {
        console.error(error)
    }
    return {} as Review[];
}