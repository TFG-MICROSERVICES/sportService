import express from 'express';
import {
    createSportController,
    deleteSportController,
    getSportsController,
    getSportByIdController,
    updateSportController,
} from '../controllers/sportControllers.js';
import { validateApiKey } from '../middlewares/validateApiKey.js';

const router = express.Router();

//GET http://localhost:3003/sport?search=
router.get('/', validateApiKey, getSportsController);

//GET http://localhost:3003/sport/:id
router.get('/:id', validateApiKey, getSportByIdController);

//POST http://localhost:3003/sport
router.post('/', validateApiKey, createSportController);

//PUT http://localhost:3003/sport/:id
router.put('/:id', validateApiKey, updateSportController);

//DELETE http://localhost:3003/sport/:id
router.delete('/:id', validateApiKey, deleteSportController);

export default router;
