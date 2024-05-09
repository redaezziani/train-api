import express from 'express';
import { 
    getLines,
    getLine,
    createLine,
    updateLine,
    deleteLine,
} from '../controllers/line';
import { isAdmin } from '../middlewares/admin';
const lineRouter = express.Router();
lineRouter.get('/lines', getLines);
lineRouter.get('/line/:id', getLine);
lineRouter.post('/line',isAdmin, createLine);
lineRouter.put('/line/:id', updateLine);
lineRouter.delete('/line/:id', deleteLine);

export default lineRouter;