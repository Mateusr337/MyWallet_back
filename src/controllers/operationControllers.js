import db from "../db.js";
import { ObjectId } from 'mongodb';
import joi from 'joi';
import dayjs from 'dayjs';

const operationSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().required().valid('exit', 'input'),
    date: joi.string()
});

export async function getOperations(req, res) {
    const { authorization } = req.headers;
    const { idUser } = req.params;

    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.sendStatus(401);

    const session = await db.collection('sessions').findOne({ token });
    if (!session) {
        return res.sendStatus(401);
    };

    const user = await db.collection('users').findOne({ _id: new ObjectId(idUser) });
    if (user) {
        res.status(200).send(user.operations);

    } else {
        return res.sendStatus(401);
    }
}

export async function postOperation(req, res) {
    const operationData = req.body;
    const { authorization } = req.headers;

    const validation = operationSchema.validate(operationData);
    if (validation.error) return res.sendStatus(422);

    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.sendStatus(401);

    const session = await db.collection('sessions').findOne({ token });
    if (!session) {
        return res.sendStatus(401);
    };

    const date = dayjs().format('MM/DD');
    await db.collection('users').updateOne(
        { _id: session.userId }, { $push: { operations: { ...operationData, date, id: Date.now() } } }
    );
    res.sendStatus(200);
}

export async function deleteOperation(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;

    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.sendStatus(401);

    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
        return res.sendStatus(401);
    }

    await db.collection('users').updateOne(
        { 'operations.id': parseInt(id) },
        { $pull: { operations: { id: parseInt(id) } } }
    );
    res.sendStatus(200);
}

export async function getOneOperation(req, res) {
    const { authorization } = req.headers;
    const { idOperation } = req.params;

    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.sendStatus(401);

    const session = await db.collection('sessions').findOne({ token });
    if (!session) {
        return res.sendStatus(401);
    };

    const operations = (await db.collection('users').findOne({ 'operations.id': parseInt(idOperation) })).operations;
    const operation = operations.find(elem => elem.id === parseInt(idOperation));
    res.send(operation);
}

export async function putOperation(req, res) {
    const operationData = req.body;
    const { authorization } = req.headers;
    const { idOperation } = req.params;

    const validation = operationSchema.validate(operationData);
    if (validation.error) return res.sendStatus(422);

    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.sendStatus(401);

    const session = await db.collection('sessions').findOne({ token });
    if (!session) {
        return res.sendStatus(401);
    };

    await db.collection('users').updateOne(
        { 'operations.id': parseInt(idOperation) },
        { $set: { 'operations.$': { ...operationData, id: parseInt(idOperation) } } }
    );
    res.sendStatus(200);
}