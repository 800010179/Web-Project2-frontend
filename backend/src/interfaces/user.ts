
interface User {
    username: string;
    password: string;
    email: string;
}
interface UserLogin {
    username: string;
    email: string;
    id: string;
  }
  
  interface TokenUser {
    id: string;
  }
  
  interface UserIdWithToken {
    id: string;
    token: string;
  } 
  interface UserTest {
    id?: string;
    username?: string; // returned from graphql is snake_case
    userName?: string; // graphql variables are camelCase
    email?: string;
    password?: string;
    token?: string;
  }
  

export {User, UserLogin, TokenUser, UserIdWithToken, UserTest}