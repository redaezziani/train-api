import express from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/user';
import { isAdmin, isAuthenticated, isSuperAdmin } from '../middlewares/auth';

const userRouter = express.Router();

userRouter.get('/users', isAuthenticated,isAdmin,getUsers);
userRouter.get('/:id', isAuthenticated,isSuperAdmin,getUser);
userRouter.post('/', isAuthenticated, isSuperAdmin,createUser);
userRouter.put('/:id', isAuthenticated,isSuperAdmin,updateUser);
userRouter.delete('/:id',isAuthenticated,isSuperAdmin, deleteUser);

export default userRouter;