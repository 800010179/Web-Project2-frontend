import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface ProfilePageReviewProps {
  id: string;
  album: string;
  song_name: string;
  song_genres: string[];
  song_artist: string;
  song_thumbnail: string;
  song_id: string;
  rating: number;
  title: string;
  comment: string;
  username: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  likes: string[];
  index: number;
  loggedUserId: string;
  handleReviewDeletion: (reviewId: string) => void; 
  handleReviewEdit: (reviewId: string, editedRating?: number, editedComment?: string, editedTitle?: string) => void;
  handleReviewLike: (reviewId: string) => void;
}

const ProfilePageReview: React.FC<ProfilePageReviewProps> = (props) => {
  const {
    id,
    album,
    song_name,
    song_artist,
    song_thumbnail,
    song_id,
    rating,
    title,
    comment,
    username,
    userId,
    createdAt,
    updatedAt,
    likes,
    index,
    loggedUserId,
    handleReviewDeletion,
    handleReviewEdit,
    handleReviewLike

  } = props;
  const createdAtDate = new Date(createdAt);
  
 
  const [isLoading, setIsLoading] = useState(false);;
  const [isEditing, setIsEditing] = useState(false);
  const [editedRating, setEditedRating] = useState(rating);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedComment, setEditedComment] = useState(comment);
  const [originalRating] = useState(rating); 
  const [validated, setValidated] = useState(false);

  const handleToggleLikeReview = async (reviewId: string) => {
    setIsLoading(true);
    handleReviewLike(reviewId);
    setIsLoading(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setValidated(false);
  };

  const handleSaveEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if(form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }else {
    const isRatingEdited = editedRating !== originalRating;
    const isTitleEdited = editedTitle !== title;
    const isCommentEdited = editedComment !== comment;

    if (!isRatingEdited && !isTitleEdited && !isCommentEdited) {
      setIsEditing(false);
      return;
    }

    handleReviewEdit(id, editedRating, editedComment, editedTitle);
    setValidated(false);
    setIsEditing(false);
    }

    setValidated(true);
  };

  const handleCancelEdit = () => {
    setEditedRating(originalRating);
    setEditedTitle(title);
    setEditedComment(comment);
    setValidated(false);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this review?");

    if (confirmed) {
      handleReviewDeletion(id); 
    }
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRating = parseInt(e.target.value);
    if (newRating >= 1 && newRating <= 5) {
      setEditedRating(newRating);
    }
    const form = e.target.form;
    if (form) {
      form.checkValidity();
    }
  };
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newComment = e.target.value;
    setEditedComment(newComment);
    const form = e.target.form;
    if (form) {
      form.checkValidity();
    }
  }
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setEditedTitle(newTitle);
    const form = e.target.form;
    if (form) {
      form.checkValidity();
    }
  }

  const maxCharacters = 100; 
  const [showFullText, setShowFullText] = useState(false);

  return (
    <div key={index} className="col-md-5 mb-3">
      <div className="card">
        <div className="card-body card-min-height">
          <div className="d-flex justify-content-end">
          {userId === loggedUserId && !isEditing && (
                <span role="button" className="material-symbols-outlined" onClick={handleEdit}>edit</span>
              )}
              {userId === loggedUserId && !isEditing && (
                <span role="button" className="material-symbols-outlined ms-3" onClick={handleDelete}>delete</span>
              )}
              {isEditing ? (
                <div>
                  <span role="button" className="material-symbols-outlined" onClick={handleCancelEdit}>close</span>
                </div>
              ): null}
          </div>
          <h4 className="card-text text-center">By: <Link key={index} to={'/user/' + userId} style={{ textDecoration: 'none' }}>{username}</Link></h4>
          {isEditing ? (
            <div>
              <Form noValidate validated={validated} onSubmit={handleSaveEdit}>
                <Form.Group className="card-text mt-2" controlId="review-title">
                  <Form.Label><h5>Title</h5></Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Title"
                    value={editedTitle}
                    onChange={handleTitleChange}
                    minLength={3}
                    maxLength={50}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid title.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="card-text mt-2" controlId="review-rating">
                  <Form.Label><h5>Rating</h5></Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Rating"
                    value={editedRating}
                    onChange={handleRatingChange}
                    min={1}
                    max={5}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a rating between 1 and 5.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="card-text mt-2" controlId="review-comment">
                  <Form.Label><h5>Comment</h5></Form.Label>
                  <Form.Control as ="textarea" rows={5}
                    required
                    placeholder="Comment"
                    value={editedComment}
                    onChange={handleCommentChange}
                    minLength={20}
                    maxLength={250}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid comment.
                  </Form.Control.Feedback>
                  <Button variant="primary" type="submit" className="mt-2">
                    Save
                  </Button>
                  <Button
                    variant="danger"
                    className="mt-2 ms-2"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </Form.Group>
              </Form>
            </div>
          ) : (
            
            <div>
                <div className="d-flex justify-content-center">
                <img
                    src={song_thumbnail}
                    className="card-img-top mb-3"
                    alt={song_name}
                    style={{ width: "300px", height: '300px', objectFit: 'cover' }}
                    onError={({currentTarget}) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "not_found.png"
                    }}
                />
                </div>
                <Link style={{ textDecoration: 'none' }} to={"/song/" + song_id}>
                <h4 className="card-title text-center">{song_name}</h4>
                </Link>
                <h4 className="card-text mb-1 text-center">{song_artist}</h4>
                <div className="d-flex gap-2 justify-content-center">
                  <p className="card-text mr-3">Album: {album}</p>
                </div>
              <h4 className="card-text mt-4">
                {title}
              </h4>
              <p className="card-text">
            {showFullText ? comment : comment.slice(0, maxCharacters)}
            {comment.length > maxCharacters && (
            <button
              onClick={() => setShowFullText(!showFullText)}
              className="btn btn-link"
            >
              {showFullText ? 'Read less' : 'Read more'}
            </button>
          )}
            </p>

              <div className="d-flex">
              <h4 className="card-text">{editedRating}/5</h4>
              <button className="ms-2"
                onClick={() => handleToggleLikeReview(id)}
                disabled={isLoading}
                style={{
                  textShadow: likes.includes(loggedUserId) ? "0px 0px 15px #FF0000" : "none",
                  fontSize: "20px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                💖
                <span className="ms-1 shadow-none">
                  {likes.length}
                </span>
              </button>
              
              </div>
            </div>
          )}
          <div className="d-flex">
            <h4 className="card-text">
              {moment(createdAtDate).fromNow()}
            </h4>
            <p className="text-muted ms-1 mt-1"><small>{createdAt !== updatedAt ? "(edited)" : null}</small></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageReview;
