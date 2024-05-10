import express from 'express';
import { 
    getLines,
    getLine,
    createLine,
    updateLine,
    deleteLine,
} from '../controllers/line';
import { isAdmin,isAuthenticated } from '../middlewares/auth';

const lineRouter = express.Router();

// Line Routes
lineRouter.get('/lines', isAuthenticated,getLines);
lineRouter.get('/line/:id', isAuthenticated,getLine);
lineRouter.post('/line',isAdmin, createLine);
lineRouter.put('/line/:id',isAdmin ,updateLine);
lineRouter.delete('/line/:id', isAdmin,deleteLine);

export default lineRouter;