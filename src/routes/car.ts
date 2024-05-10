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
carRouter.get('/car/:id', isAuthenticated,getCar);
carRouter.post('/car', isAdmin,createCar);
carRouter.put('/car/:id', isAdmin,updateCar);
carRouter.delete('/car/:id', isAdmin,deleteCar);

export default carRouter;