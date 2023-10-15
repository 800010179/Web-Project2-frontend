import {UserLogin} from './user';

export default interface AuthMessageResponse {
  message: string;
  data: UserLogin | UserLogin[];
  token?: string;
}
