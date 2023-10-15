import express from 'express';
import {
  userGetByUsername,
  userDelete,
  userGet,
  userListGet,
  userPost,
  userPut,
} from '../controllers/userController';
import {authenticate} from '../../middlewares';

const router = express.Router();

router
  .route('/')
  .get(userListGet)
  .post(userPost)
  .put(authenticate, userPut)
  .delete(authenticate, userDelete);

router.route('/:id').get(userGet);

router.route('/username/:username').get(userGetByUsername);

export default router;
