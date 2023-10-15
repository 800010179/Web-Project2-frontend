import User from "./User";
export interface RegisterResponse {
    data: {
        register: {
            data: User
            token: string
        }
    }
    errors: [
        {
            message: string
        }
    ]
  }
  export interface LoginResponse {
    data: {
        login: {
            token: string
            user: User
        }
    }
    errors: [
        {
            message: string
        }
    ]
    
  }