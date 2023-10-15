
import { gql, GraphQLClient } from "graphql-request";
import Song from "../interfaces/Song";

export interface createSongResponse {
    addSong: {
        id: string;
        song_name: string;
        thumbnail: string;
        artist: string;
        album: string;
        genres: string[];
        api_id: string;
      };
}

export async function createSong(song_name: string, thumbnail: string, artist: string, album: string, genres: string[], api_id: string): Promise<Song> {
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    const likeReviewMutation = gql`
    mutation Mutation($songName: String!, $thumbnail: String!, $artist: String!, $album: String!, $genres: [String]!, $apiId: String!) {
      addSong(song_name: $songName, thumbnail: $thumbnail, artist: $artist, album: $album, genres: $genres, api_id: $apiId) {
        id
        song_name
        thumbnail
        artist
        album
        genres
        api_id
      }
    }
    `;
    const graphQLClient = new GraphQLClient(API_URL || "", {});
   const variables = {
        songName: song_name,
        thumbnail: thumbnail,
        artist: artist,
        album: album,
        genres: genres,
        apiId: api_id
    };
    const response: createSongResponse = await graphQLClient.request(likeReviewMutation, variables);
    
    const createdSong: Song = response.addSong;
    return createdSong;
  } catch (error) {
    console.error(error);
    return {} as Song; 
  }
}
