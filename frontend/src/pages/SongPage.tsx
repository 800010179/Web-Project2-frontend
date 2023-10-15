import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSong } from '../hooks/getSong';
import Review from '../interfaces/Review';
import { getReviewsBySong } from '../hooks/getReviewsBySong';
import { createReview } from '../hooks/createReview';
import { deleteReview }from '../hooks/deleteReview';
import Song from '../interfaces/Song';
import User from '../interfaces/User';
import SongPageReview from '../components/ReviewCard/SongPageReview';
import { editReview } from '../hooks/editReview';
import { likeReview } from '../hooks/likeReview';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const SongPage: React.FC = () => {
  const songId = useParams().songId;
  const [song, setSong] = useState<Song | null>(null);
  const [reviews, setReviews] = useState<(Review & { likes: string[] })[]>([]);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 1, title: '', text: '' });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [orderByDateNewest, setOrderByDateNewest] = useState(false);
  const [orderByDateOldest, setOrderByDateOldest] = useState(false);
  const [orderByLikesLeast, setOrderByLikesLeast] = useState(false);
  const [orderByLikesMost, setOrderByLikesMost] = useState(false);
  const userString = localStorage.getItem('user');
  const [validated, setValidated] = useState(false);
  const user: User = userString ? JSON.parse(userString) : null;
  let userId = 'none';
  let songIdString = 'none';
  if (user.id != null) {
    userId = user.id;
  }
  if (songId != null) {
    songIdString = songId;
  }

  const toggleReviewForm = () => {
    setNewReview({ rating: 1, title: '', text: '' });
    setValidated(false);
    setIsAddingReview(!isAddingReview);
  };

  const handleNewReviewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
    const form = e.target.form;
    if (form) {
      form.checkValidity();
      
    }
  };

  const handleSubmitNewReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if(form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }else {
      if (typeof newReview.rating !== 'number') {
        newReview.rating = parseInt(newReview.rating);
      }
      const token = localStorage.getItem('token') || '';
      await createReview(newReview.rating, newReview.text, newReview.title, songIdString, token);
      const reviewsData = await getReviewsBySong(songIdString);
      setReviews(reviewsData);
      setNewReview({ rating: 1, title: '', text: '' });
      setValidated(false);
      setIsAddingReview(false);
    }

    setValidated(true);
  };

  const handleReviewDeletion = async (deletedReviewId: string) => {
    const token = localStorage.getItem('token') || '';
    await deleteReview(token, deletedReviewId);
    const reviewsData = await getReviewsBySong(songIdString);
    setReviews(reviewsData);
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
    const reviewsData = await getReviewsBySong(songIdString);
    setReviews(reviewsData);
  };
  const handleReviewLike = async (likedReviewId: string) => {
    const token = localStorage.getItem('token') || '';
    await likeReview(likedReviewId, token);
    const reviewsData = await getReviewsBySong(songIdString);
    setReviews(reviewsData);
  };
  useEffect(() => {
    async function fetchSongData() {
      try {
        const songData = await getSong(songId || '');
        setSong(songData);
      } catch (error) {
        console.error('Error fetching song data:', error);
      }
    }

    fetchSongData();
  }, [songId]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const reviewsData = await getReviewsBySong(songId || '');
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    fetchReviews();
  }, [songId]);

  

  const filteredReviews = reviews.filter((review) =>
    review.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedReviews = [...filteredReviews];

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
      {song ? (
        <div>
          <div className="d-flex justify-content-start">
            <img
              src={song.thumbnail}
              className="card-img-top mb-3"
              alt={song.song_name}
              style={{
                width: "50%",
                height: "500px",
                objectFit: "cover",
              }}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "not_found.png";
              }}
            />
            <div className="d-flex flex-column">
              <h1 className="text-center ms-5">{song.song_name}</h1>
              <p className="card-text ms-5">By: {song.artist}</p>
              <div className="d-flex ms-5 gap-2">
              <div className="d-flex gap-2 justify-content-center">
                  <p className="card-text mr-3">Album: {song.album}</p>
                </div>
              </div>
              <input
                  type="text"
                  placeholder="Search by username"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ms-5 mt-5"
              />
              <div className="d-flex ms-5 justify-content-between">
                <div>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      Sort reviews by
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => {
                        setOrderByDateNewest(true);
                        setOrderByDateOldest(false);
                        setOrderByLikesLeast(false);
                        setOrderByLikesMost(false);
                        }}>
                        Newest to oldest
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => {
                        setOrderByDateNewest(false);
                        setOrderByDateOldest(true);
                        setOrderByLikesLeast(false);
                        setOrderByLikesMost(false);
                        }}>
                        Odest to Newest
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => {
                        setOrderByDateNewest(false);
                        setOrderByDateOldest(false);
                        setOrderByLikesLeast(false);
                        setOrderByLikesMost(true);
                        }}>
                        Most likes
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => {
                        setOrderByDateNewest(false);
                        setOrderByDateOldest(false);
                        setOrderByLikesLeast(true);
                        setOrderByLikesMost(false);
                        }}>
                        Least likes
                      </Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
                </div>
                <Button variant="primary"  onClick={toggleReviewForm} id='add-review-button'>Add a Review</Button>
              </div>
              <div className="ms-5 mt-5">
                {isAddingReview ? (
                  <Form noValidate validated={validated} onSubmit={handleSubmitNewReview}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control type="number" id="rating" name="rating" max={5} min={1} value={newReview.rating} onChange={handleNewReviewChange} required />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid rating.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" id="title" name="title" value={newReview.title} onChange={handleNewReviewChange} required placeholder="Review title"
                     minLength={3} maxLength={50}/>
                     <Form.Control.Feedback type="invalid">
                      Please provide a valid title.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Review</Form.Label>
                    <Form.Control as="textarea" rows={4} id="text" name="text" value={newReview.text} onChange={handleNewReviewChange} required placeholder="Review text"
                     minLength={20} maxLength={250}/>
                     <Form.Control.Feedback type="invalid">
                      Please provide a valid review.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit Review
                  </Button>
                  <Button className="ms-2" variant="danger" onClick={toggleReviewForm}>
                    Cancel
                  </Button>
                </Form>
                ) : null}
              </div>
            </div>
          </div>
  
          <h2 className="text-center">Reviews</h2>
  
          {sortedReviews.length > 0 ? (
            <div className="container">
              <div className="row justify-content-center">
                {sortedReviews.map((review, index) => (
                  <SongPageReview
                    key={index}
                    id={review.id}
                    song_name={review.song.song_name}
                    artist={review.song.artist}
                    rating={review.rating}
                    title={review.title}
                    comment={review.comment}
                    username={review.user.username}
                    userId={review.user.id}
                    createdAt={review.createdAt}
                    updatedAt={review.updatedAt}
                    likes={review.likes}
                    index={index}
                    loggedUserId={userId}
                    handleReviewDeletion={handleReviewDeletion}
                    handleReviewEdit={handleReviewEdit}
                    handleReviewLike={handleReviewLike}
                  ></SongPageReview>
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

export default SongPage;
