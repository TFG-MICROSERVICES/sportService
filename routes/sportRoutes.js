import express from 'express';
import {
    createSportController,
    deleteSportController,
    getSportsController,
    getSportByIdController,
    updateSportController
} from '../controllers/sportControllers.js';


const router = express.Router();

router.post('/', createSportController);
router.get('/', getSportsController);
router.get('/:id', getSportsController);
router.put('/:id', updateSportController);
router.delete('/:id', deleteSportController);


export default router;