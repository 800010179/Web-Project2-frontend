import express from 'express';

import deezerRoute from './routes/deezerRoute';

const router = express.Router();

router.use('/deezer', deezerRoute);

export default router;