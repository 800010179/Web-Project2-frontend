
import { gql, GraphQLClient } from "graphql-request";
import Review from "../interfaces/Review";

export interface editReviewResponse {
    editReview: {
        data: Review;
    };
}

export async function editReview(token: string, id: string, rating?: number, comment?: string, title?: string, songId?: string): Promise<Review> {
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    const likeReviewMutation = gql`
    mutation Mutation($updateReviewId: ID!, $rating: Float, $comment: String, $title: String) {
        updateReview(id: $updateReviewId, rating: $rating, comment: $comment, title: $title) {
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
    const variables: { [key: string]: any } = {};
    variables.updateReviewId = id;
    if (typeof rating !== 'undefined') variables.rating = rating;
    if (typeof comment !== 'undefined') variables.comment = comment;
    if (typeof title !== 'undefined') variables.title = title;
    if (typeof songId !== 'undefined') variables.song = songId;
    const response: any = await graphQLClient.request(likeReviewMutation, variables);
    
    const editedReview: Review = response;
    return editedReview;
  } catch (error) {
    console.error(error);
    return {} as Review; 
  }
}
