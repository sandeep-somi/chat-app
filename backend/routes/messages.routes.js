import express from 'express';
import { send, get } from '../controller/messages.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/send/:receiver_id', protectRoute, send);
router.get('/:receiver_id', protectRoute, get);

export default router;
