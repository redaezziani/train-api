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
lineRouter.get('/:id', isAuthenticated,getLine);
lineRouter.post('/',isAdmin, createLine);
lineRouter.put('/:id',isAdmin ,updateLine);
lineRouter.delete('/:id', isAdmin,deleteLine);

export default lineRouter;