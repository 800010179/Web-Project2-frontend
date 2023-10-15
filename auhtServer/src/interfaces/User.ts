import {Document} from 'mongoose';
interface User extends Document {
  username: string;
  email: string;
  password: string;
}

interface OutputUser {
  id?: string;
  username: string;
  email: string;
}

export {User, OutputUser};
