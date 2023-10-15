import {Schema, model} from 'mongoose';
import {Review} from '../../interfaces/review';

const reviewSchema = new Schema<Review>({
    likes: {type: [String], default: []},
    song: {type: Schema.Types.ObjectId, ref: 'Song', required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true},
    title: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

export default model<Review>('Review', reviewSchema);