
import { gql, GraphQLClient } from "graphql-request";
import Review from "../interfaces/Review";

export interface createReviewResponse {
    createReview: {
        data: Review;
    };
}

export async function createReview(rating: number, comment: string, title: string, songId: string, token: string): Promise<Review> {
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    const likeReviewMutation = gql`
    mutation Mutation($rating: Float!, $comment: String!, $title: String!, $song: ID!) {
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
    `;
    
    const graphQLClient = new GraphQLClient(API_URL || '', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    const variables = {
        rating: rating,
        comment: comment,
        title: title,
        song: songId
    };
    const response: createReviewResponse = await graphQLClient.request(likeReviewMutation, variables);
    
    const createdReview: Review = response.createReview.data;
    return createdReview;
  } catch (error) {
    console.error(error);
    return {} as Review; 
  }
}
