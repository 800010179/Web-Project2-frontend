import User from "../interfaces/User";
import { gql, GraphQLClient } from "graphql-request";
export async function getUser(userId: string): Promise<User> {
    try {
        const API_URL = process.env.REACT_APP_API_URL
        const loginUserMutation = gql`
            query userById($id: ID!) {
                userById(id: $id) {
                    id
                    username
                    email
                }
            }
        `;
        const graphQLClient = new GraphQLClient(API_URL || "", {});
        const variables = {
            id: userId
        };
        const data: any = await graphQLClient.request(loginUserMutation, variables);
        const user: User = data.userById;
        return user;

    }catch(error) {
        console.error(error)
    }
    return {} as User;
}