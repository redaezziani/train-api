import express from 'express';
import { 
    getCars,
    getCar,
    createCar,
    updateCar,
    deleteCar,
} from '../controllers/car';
import { isAdmin, isAuthenticated } from '../middlewares/auth';

const carRouter = express.Router();

// Car Routes
carRouter.get('/cars', isAuthenticated,getCars);
carRouter.get('/:id', isAuthenticated,getCar);
carRouter.post('/', isAdmin,createCar);
carRouter.put('/:id', isAdmin,updateCar);
carRouter.delete('/:id', isAdmin,deleteCar);

export default carRouter;