
const login = `
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      message
      user {
        id
        username
        email
      }
    }
  }
  `;
const register = `
mutation Register($user: UserInput!) {
  register(user: $user) {
    message
    data {
      id
      username
      email
    }
    token
  }
} `;

export {login, register};