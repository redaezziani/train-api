import express from 'express';
import { 
    getCars,
    getCar,
    createCar,
    updateCar,
    deleteCar,
} from '../controllers/car';
const carRouter = express.Router();
carRouter.get('/cars', getCars);
carRouter.get('/car/:id', getCar);
carRouter.post('/car', createCar);
carRouter.put('/car/:id', updateCar);
carRouter.delete('/car/:id', deleteCar);

export default carRouter;