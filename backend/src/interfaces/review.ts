import {Document, Types} from 'mongoose';
import {Song} from './song';
import {User} from './user';
interface Review extends Document {
    likes: string[];
    song: Song | Types.ObjectId;
    user: User | Types.ObjectId;
    rating: number;
    comment: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

interface ReviewTest {
    id?: string;
    likes?: string[];
    song?: string | Types.ObjectId | Song;
    user?: User | Types.ObjectId;
    rating?: number;
    comment?: string;
    title?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export {Review, ReviewTest}