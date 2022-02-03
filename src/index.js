import express, { json } from 'express';
import cors from 'cors';
import { signIn, signUp } from './controllers/authControllers.js';
import { deleteOperation, getOneOperation, getOperations, postOperation, putOperation } from './controllers/operationControllers.js';


const server = express();
server.use(cors());
server.use(json());



server.post('/sign-up', signUp);
server.post('/sign-in', signIn);
server.get('/operations/:idUser', getOperations);
server.post('/operation', postOperation);
server.delete('/operation/:id', deleteOperation);
server.get('/operation/:idOperation', getOneOperation);
server.put('/operation/:idOperation', putOperation);

server.listen(5000);
