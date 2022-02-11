import { Router } from 'express';
import { getOperations, postOperation, deleteOperation, getOneOperation, putOperation } from '../controllers/operationControllers.js';
import { validateToken } from '../middlewares/validateToken.js';
import validateOperationSchema from '../middlewares/validateOperationSchema.js';

const operationRouter = Router();

operationRouter.use(validateToken);
operationRouter.get('/operations/:idUser', getOperations);
operationRouter.post('/operation', validateOperationSchema, postOperation);
operationRouter.delete('/operation/:id', deleteOperation);
operationRouter.get('/operation/:idOperation', getOneOperation);
operationRouter.put('/operation/:idOperation', validateOperationSchema, putOperation);

export default operationRouter;