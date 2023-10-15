import {OutputUser} from './User';

export default interface LoginMessageResponse {
  token?: string;
  user: OutputUser;
  message: string;
}
