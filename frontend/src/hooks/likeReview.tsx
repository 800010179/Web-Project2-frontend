
import { gql, GraphQLClient } from "graphql-request";

export interface ReviewLikeResponse {
  likeReview: {
    id: string;
    likes: string[];
  };
}

export async function likeReview(reviewId: string, token: string): Promise<string[]> {
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    const likeReviewMutation = gql`
      mutation LikeReview($reviewId: ID!) {
        likeReview(id: $reviewId) {
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
      reviewId: reviewId
    };

   
    const response: ReviewLikeResponse = await graphQLClient.request(likeReviewMutation, variables);
    
 
    const reviewLikes: string[] = response.likeReview.likes;
    return reviewLikes;
  } catch (error) {
    console.error(error);
    return []; 
  }
}
