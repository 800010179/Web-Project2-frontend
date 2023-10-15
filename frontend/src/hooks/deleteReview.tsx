
import { gql, GraphQLClient } from "graphql-request";
import Review from "../interfaces/Review";

export interface deleteReviewResponse {
    createReview: {
        data: Review;
    };
}

export async function deleteReview(token: string, id: string): Promise<Review> {
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    const likeReviewMutation = gql`
    mutation DeleteReview($deleteReviewId: ID!) {
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
      }
    `;

    const graphQLClient = new GraphQLClient(API_URL || '', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    const variables = {
        deleteReviewId: id
    };
    const response: any = await graphQLClient.request(likeReviewMutation, variables);
    
    const createdReview: Review = response;
    return createdReview;
  } catch (error) {
    console.error(error);
    return {} as Review; 
  }
}
