import expect from 'expect';
import request from 'supertest';
import { User, UserTest } from '../src/interfaces/user';
import LoginMessageResponse from '../src/interfaces/LoginMessageResponse';
import randomstring from 'randomstring';

const getUserList = (url: string | Function): Promise<UserTest[]> => {
    return new Promise((resolve, reject) => {
      request(url)
        .post('/graphql')
        .set('Content-type', 'application/json')
        .send({
          query: '{users{id username email}}',
        })
        .expect(200, (err, response) => {
          if (err) {
            reject(err);
          } else {
            const users = response.body.data.users;
            expect(users).toBeInstanceOf(Array);
            expect(users[0]).toHaveProperty('id');
            expect(users[0]).toHaveProperty('username');
            expect(users[0]).toHaveProperty('email');
            resolve(response.body.data.users);
          }
        });
    });
};
const getUserById = (
    url: string | Function,
    id: string
  ): Promise<UserTest> => {
    return new Promise((resolve, reject) => {
      request(url)
        .post('/graphql')
        .set('Content-type', 'application/json')
        .send({
          query: `query UserById($userByIdId: ID!) {
            userById(id: $userByIdId) {
              username
              id
              email
            }
          }`,
          variables: {
            userByIdId: id,
          },
        })
        .expect(200, (err, response) => {
          if (err) {
            reject(err);
          } else {
            const user = response.body.data.userById;
            expect(user.id).toBe(id);
            expect(user).toHaveProperty('username');
            expect(user).toHaveProperty('email');
            resolve(response.body.data.userById);
          }
        });
    });
};
const postUser = (
    url: string | Function,
    user: UserTest
  ): Promise<UserTest> => {
    return new Promise((resolve, reject) => {
      request(url)
        .post('/graphql')
        .set('Content-type', 'application/json')
        .send({
          query: `mutation Register($user: UserInput!) {
            register(user: $user) {
              message
              data {
                id
                username
                email
              }
              token
            }
          }`,
          variables: {
            user: {
              username: user.username,
              email: user.email,
              password: user.password,
            },
          },
        })
        .expect(200, (err, response) => {
          if (err) {
            reject(err);
          } else {
            const userData = response.body.data.register;
            expect(userData).toHaveProperty('message');
            expect(userData).toHaveProperty('data');
            expect(userData.data).toHaveProperty('id');
            expect(userData.data.username).toBe(user.username);
            expect(userData.data.email).toBe(user.email);
            resolve(response.body.data.register);
          }
        });
    });
};

const loginUser = (
    url: string | Function,
    user: UserTest
    ): Promise<LoginMessageResponse> => {
        return new Promise((resolve, reject) => {
            request(url)
            .post('/graphql')
            .set('Content-type', 'application/json')
            .send({
                query: `mutation Login($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                      token
                      message
                      user {
                        id
                        username
                        email
                      }
                    }
                  }`,
                variables: {
                email: user.email,
                password: user.password,
                },
            })
            .expect(200, (err, response) => {
                if (err) {
                reject(err);
                } else {
                const userData = response.body.data.login;
                expect(userData).toHaveProperty('message');
                expect(userData).toHaveProperty('user');
                expect(userData).toHaveProperty('token');
                expect(userData.user).toHaveProperty('id');
                expect(userData.user.username).toBe(user.username);
                expect(userData.user.email).toBe(user.email);
                resolve(response.body.data.login);
                }
            });
    });
}
const putUser = (url: string | Function, token: string) => {
        return new Promise((resolve, reject) => {
              const newValue = 'Test Update ' + randomstring.generate(7);
              request(url)
                .post('/graphql')
                .set('Content-type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send({
                  query: `mutation UpdateUser($user: UserModify!) {
                    updateUser(user: $user) {
                      token
                      message
                      user {
                        id
                        username
                        email
                      }
                    }
                  }`,
                  variables: {
                    user: {
                      username: newValue,
                    },
                  },
                })
                .expect(200, (err, response) => {
                  if (err) {
                    reject(err);
                  } else {
                    const userData = response.body.data.updateUser;
                    expect(userData).toHaveProperty('message');
                    expect(userData).toHaveProperty('user');
                    expect(userData.user).toHaveProperty('id');
                    expect(userData.user.username).toBe(newValue);
                    resolve(response.body.data.updateUser);
                  }
                });
        });
};
          const deleteUser = (
            url: string | Function,
            token: string
          ): Promise<any> => {
            return new Promise((resolve, reject) => {
              request(url)
                .post('/graphql')
                .set('Authorization', 'Bearer ' + token)
                .send({
                  query: `mutation DeleteUser {
                    deleteUser {
                      message
                      user {
                        id
                        username
                        email
                      }
                    }
                  }`,
                })
                .expect(200, (err, response) => {
                  if (err) {
                    reject(err);
                  } else {
                    const userData = response.body.data.deleteUser;
                    expect(userData).toHaveProperty('message');
                    expect(userData).toHaveProperty('user');
                    resolve(response.body.data.deleteUser);
                  }
                });
            });
          };
  export {getUserList, postUser, loginUser, getUserById, putUser, deleteUser}