import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


const server = express();
server.use(cors());
server.use(json());
dotenv.config();

server.post();

server.listen(5000);
