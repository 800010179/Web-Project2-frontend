import LoginMessageResponse from "../../interfaces/LoginMessageResponse";
import fetchData from "../../utils/fetchData";
import { User, UserIdWithToken } from "../../interfaces/user";
import AuthMessageResponse from "../../interfaces/AuthMessageResponse";
import { GraphQLError } from "graphql";
import { Review } from "../../interfaces/review";

export default {
    Review: {
        user: async (parent: Review) => {
            const user = await fetchData<AuthMessageResponse>(
              `${process.env.AUTH_URL}/users/${parent.user}`
            );
            return user.data;
          },
      },
    Query: {
        users: async () => {
              const users = await fetchData<AuthMessageResponse>(
                `${process.env.AUTH_URL}/users`
              );
              return users.data;
          },
        userById: async (_parent: undefined, args: {id: string}) => {
            console.log("userbyid")
            const user = await fetchData<AuthMessageResponse>(
              `${process.env.AUTH_URL}/users/${args.id}`
            );
            return user.data;
          },
      },
    Mutation: {
        login: async (
            _parent: undefined,
            args: {email: string; password: string}
          ) => {
            try {
            const options: RequestInit = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(args),
            };
            const user = await fetchData<LoginMessageResponse>(
              `${process.env.AUTH_URL}/auth/login`,
              options
            );
            return user;
            } catch (error) {
              return error;
            }
          },
        register: async (_parent: undefined, args: {user: User}) => {
            const options: RequestInit = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(args.user),
            };
      
            const user = await fetchData<AuthMessageResponse>(
              `${process.env.AUTH_URL}/users`,
              options
            );
      
            return user;
        },
        updateUser: async (
          _parent: undefined,
          args: {user: User},
          user: UserIdWithToken
         ) => {
             if (!user.token) {
              throw new GraphQLError('You are not authorized to perform this action');
            }
            const options: RequestInit = {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify(args.user),
            };
      
            const response = await fetchData<LoginMessageResponse>(
              `${process.env.AUTH_URL}/users`,
              options
            );
            return response;
          },
        deleteUser: async (
            _parent: undefined,
            args: undefined,
            user: UserIdWithToken
          ) => {
            if (!user.token) {
              throw new GraphQLError('You are not authorized to perform this action');
            }
            const options: RequestInit = {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
            };
      
            const response = await fetchData<LoginMessageResponse>(
              `${process.env.AUTH_URL}/users`,
              options
            );
            return response;
          },
      }
};