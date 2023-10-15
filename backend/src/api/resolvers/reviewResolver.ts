import { GraphQLError } from 'graphql';
import { Review } from '../../interfaces/review';
import ReviewModel from '../models/reviewModel';
import { User, UserIdWithToken } from '../../interfaces/user';
import { Types } from 'mongoose';
import fetchData from '../../utils/fetchData';
import AuthMessageResponse from '../../interfaces/AuthMessageResponse';

export default {
    Query: {
        reviews: async () => {
            const reviews = await ReviewModel.find();
            return reviews;
        },
        reviewById: async (_parent: undefined, args: {id: string}) => {
            const review = await ReviewModel.findById(args.id);
            return review;
        },
        reviewsBySong: async (_parent: undefined, args: {songId: string}) => {
            const reviews = await ReviewModel.find({song: args.songId});
            return reviews;
        },
        reviewsByUser: async (_parent: undefined, args: {userId: string}) => {
            const reviews = await ReviewModel.find({user: args.userId});
            return reviews;
        },
        reviewsByUsername: async (_parent: undefined, args: { username: string }) => {
            const users = await fetchData<AuthMessageResponse>(
                `${process.env.AUTH_URL}/users/username/${args.username}`
              );
            //console.log(users.data)
            if (Array.isArray(users.data)) {
              // Extract user IDs
              const userIds = users.data.map((user) => user.id);
      
              // Find reviews by user IDs
              const reviews = await ReviewModel.find({ user: { $in: userIds } });
              return reviews;
            } else {
              // Handle the case when there's only one user with the given username
              const reviews = await ReviewModel.find({ user: users.data.id });
              return reviews;
            }
          },
          reviewsLikedByUser: async (_parent: undefined, args: { userId: string }) => {
            const reviews = await ReviewModel.find({ likes: args.userId });
            return reviews;
          }

    },
    Mutation: {
        createReview: async (_parent: undefined, args: Review, user: UserIdWithToken) => {
            
            if (!user.token) {
                throw new GraphQLError('You are not authorized to perform this action');
            }
            args.user = user.id as unknown as Types.ObjectId;
           
            const newReview = new ReviewModel(args);
            return await newReview.save();
        },
        updateReview: async (_parent: undefined, args: Review, user: UserIdWithToken) => {
            if (!user.token) {
                throw new GraphQLError('You are not authorized to perform this action');
            }
            args.updatedAt = new Date();
            const review = await ReviewModel.findByIdAndUpdate(
                {_id: args.id, user: user.id},
                args,
                { new: true }
            );
            if (!review) {
                throw new GraphQLError('Not your review or review not found');
            }
            
            return review;
        },
        deleteReview: async (_parent: undefined, args: {id: string}, user: UserIdWithToken) => {
            if (!user.token) {
                throw new GraphQLError('You are not authorized to perform this action');
            }
            const review = await ReviewModel.findByIdAndRemove({
                _id: args.id,
                user: user.id,
            });
            if (!review) {
                throw new GraphQLError('Not your review or review not found');
            }
            return review;
        },
        likeReview: async (_parent: undefined, args: {id: string}, user: UserIdWithToken) => {
            if (!user.token) {
                throw new GraphQLError('You are not authorized to perform this action');
            }
            const review: Review = await ReviewModel.findById(args.id);
            if (!review) {
                throw new GraphQLError('Review not found');
            }
            if (review.likes.includes(user.id)) {
                review.likes = review.likes.filter((like) => like !== user.id);
            }
            else {
                review.likes.push(user.id);
            }
            
            await review.save();
            return review;
        },
    },
};
