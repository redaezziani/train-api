import express from 'express';
import {
    getTrains,
    getTrain,
    createTrain,
    updateTrain,
    deleteTrain,
} from '../controllers/train';
import { isAdmin, isAuthenticated } from '../middlewares/auth';

const trainRouter = express.Router();

// Train Routes
trainRouter.get('/trains', isAuthenticated,getTrains);
trainRouter.get('/:id',isAuthenticated ,getTrain);
trainRouter.post('/', isAdmin,createTrain);
trainRouter.put('/:id', isAdmin,updateTrain);
trainRouter.delete('/:id', isAdmin,deleteTrain);

export default trainRouter;
