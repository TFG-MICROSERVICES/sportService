import express from 'express';
import {
    createSportController,
    deleteSportController,
    getSportsController,
    getSportByIdController,
    updateSportController
} from '../controllers/sportControllers.js';
import { validateApiKey } from '../middlewares/validateApiKey.js';


const router = express.Router();

router.post('/',validateApiKey, createSportController);
router.get('/',validateApiKey, getSportsController);
router.get('/:id',validateApiKey, getSportsController);
router.put('/:id',validateApiKey, updateSportController);
router.delete('/:id',validateApiKey, deleteSportController);

export default router;