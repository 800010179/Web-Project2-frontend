import express from 'express';
import { getDeezerSongs } from '../controllers/deezerController';

const router = express.Router();

router
    .route('/:query')
    .get(getDeezerSongs)

export default router;