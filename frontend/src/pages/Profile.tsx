import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import User from '../interfaces/User';
import { getUser } from '../hooks/getUser';
import Review from '../interfaces/Review';
import { getReviews } from '../hooks/getReviews';
import ProfilePageReview from '../components/ReviewCard/ProfilePageReview';
import { deleteReview } from '../hooks/deleteReview';
import { likeReview } from '../hooks/likeReview';
import { editReview } from '../hooks/editReview';
import { Dropdown } from 'react-bootstrap';
import { getReviewsLikedByUser } from '../hooks/getReviewsLikedByUser';
import Button from 'react-bootstrap/Button';

const ProfilePage: React.FC = () => {
  const userId = useParams().userId;
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [orderByDateNewest, setOrderByDateNewest] = useState(false);
  const [orderByDateOldest, setOrderByDateOldest] = useState(false);
  const [orderByLikesLeast, setOrderByLikesLeast] = useState(false);
  const [orderByLikesMost, setOrderByLikesMost] = useState(false);
  const userString = localStorage.getItem('user');
  const loggedUser: User = userString ? JSON.parse(userString) : null;
  let userIdString = "none";
  if (loggedUser.id != null) {
    userIdString = loggedUser.id;
  }
  const [fetchLiked, setFetchLiked] = useState(false);
  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUser(userId || '');
        setUser(userData);
      } catch (error) {
        throw error;
      }
    }

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        let reviewsData = [] as Review[];
        if (!fetchLiked) {
          reviewsData = await getReviews(userId || '');
        }
        else {
          reviewsData = await getReviewsLikedByUser(userId || '');
        }
        
        setReviews(reviewsData);
      } catch (error) {
        throw error;
      }
    }

    fetchReviews();
  }, [userId, fetchLiked]);
  
  const handleReviewDeletion = async (deletedReviewId: string) => {
    const token = localStorage.getItem("token") || "";
    await deleteReview(token,deletedReviewId);
    if(!fetchLiked) {
      const reviewsData = await getReviews(userId || '');
      setReviews(reviewsData);
    }
    else {
      const reviewsData = await getReviewsLikedByUser(userId || '');
      setReviews(reviewsData);
    }
  };
  const handleReviewEdit = async (editedReviewId: string, editedRating?: number, editedComment?: string, editedTitle?: string) => {
    const token = localStorage.getItem('token') || '';
    await editReview(
      token,
      editedReviewId,
      editedRating,
      editedComment,
      editedTitle
    );
    if(!fetchLiked) {
      const reviewsData = await getReviews(userId || '');
      setReviews(reviewsData);
    }
    else {
      const reviewsData = await getReviewsLikedByUser(userId || '');
      setReviews(reviewsData);
    }
  };
  const handleReviewLike = async (likedReviewId: string) => {
    const token = localStorage.getItem('token') || '';
    await likeReview(likedReviewId, token);
    if(!fetchLiked) {
      const reviewsData = await getReviews(userId || '');
      setReviews(reviewsData);
    }
    else {
      const reviewsData = await getReviewsLikedByUser(userId || '');
      setReviews(reviewsData);
    }
  };

  const sortedReviews = [...reviews] || [];

  if (orderByDateNewest) {
    sortedReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (orderByDateOldest) {
    sortedReviews.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } else if (orderByLikesLeast) {
    sortedReviews.sort((a, b) => a.likes.length - b.likes.length);
  } else if (orderByLikesMost) {
    sortedReviews.sort((a, b) => b.likes.length - a.likes.length);
  }

  return (
    <div>
      {user ? (
        <div>
          <h1 className="text-center">{user.username}'s profile</h1>
          <h2 className="text-center">Reviews</h2>
          <div className="d-flex ms-5">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Sort reviews by
              </Dropdown.Toggle>
  
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setOrderByDateNewest(true);
                    setOrderByDateOldest(false);
                    setOrderByLikesLeast(false);
                    setOrderByLikesMost(false);
                  }}
                >
                  Newest to oldest
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setOrderByDateNewest(false);
                    setOrderByDateOldest(true);
                    setOrderByLikesLeast(false);
                    setOrderByLikesMost(false);
                  }}
                >
                  Odest to Newest
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setOrderByDateNewest(false);
                    setOrderByDateOldest(false);
                    setOrderByLikesLeast(false);
                    setOrderByLikesMost(true);
                  }}
                >
                  Most likes
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setOrderByDateNewest(false);
                    setOrderByDateOldest(false);
                    setOrderByLikesLeast(true);
                    setOrderByLikesMost(false);
                  }}
                >
                  Least likes
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {fetchLiked ? (
              <div>
                <Button
                  className="ms-2 mt-1"
                  variant="secondary"
                  onClick={() => setFetchLiked(false)}
                >
                  Created
                </Button>
                <Button
                  className="ms-2 mt-1"
                  variant="primary"
                  onClick={() => setFetchLiked(true)}
                >
                  Liked
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  className="ms-2 mt-1"
                  variant="primary"
                  onClick={() => setFetchLiked(false)}
                >
                  Created
                </Button>
                <Button
                  className="ms-2 mt-1"
                  variant="secondary"
                  onClick={() => setFetchLiked(true)}
                >
                  Liked
                </Button>
              </div>
            )}
          </div>
          {reviews.length > 0 ? (
            <div className="container">
              <div className="row justify-content-center mt-5">
                {sortedReviews.map((review, index) => (
                  <ProfilePageReview
                    key={index}
                    id={review.id}
                    song_name={review.song.song_name}
                    album={review.song.album}
                    song_artist={review.song.artist}
                    song_genres={review.song.genres}
                    song_thumbnail={review.song.thumbnail}
                    song_id={review.song.id}
                    rating={review.rating}
                    title={review.title}
                    comment={review.comment}
                    username={review.user.username}
                    userId={review.user.id}
                    createdAt={review.createdAt}
                    updatedAt={review.updatedAt}
                    likes={review.likes}
                    index={index}
                    loggedUserId={userIdString}
                    handleReviewDeletion={handleReviewDeletion}
                    handleReviewEdit={handleReviewEdit}
                    handleReviewLike={handleReviewLike}
                  ></ProfilePageReview>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center">No reviews found...</p>
          )}
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
  
};

export default ProfilePage;
