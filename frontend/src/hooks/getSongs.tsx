import { gql, GraphQLClient } from "graphql-request";
import Song from "../interfaces/Song";
export async function getSongs(): Promise<Song[]> {
    try {
        const API_URL = process.env.REACT_APP_API_URL
        const loginUserMutation = gql`
        query Query {
            songs {
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

        const data: any = await graphQLClient.request(loginUserMutation);
        const songs: Song[] = data.songs;
        return songs;

    }catch(error) {
        console.error(error)
    }
    return {} as Song[];
}