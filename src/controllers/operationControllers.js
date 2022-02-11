import db from "../db.js";
import { ObjectId } from 'mongodb';
import dayjs from 'dayjs';


export async function getOperations(req, res) {
    const { idUser } = req.params;

    const user = await db.collection('users').findOne({ _id: new ObjectId(idUser) });
    if (user) {
        res.status(200).send(user.operations);

    } else {
        return res.sendStatus(401);
    }
}

export async function postOperation(req, res) {
    const operationData = req.body;

    const user = res.locals.user;

    const date = dayjs().format('DD/MM');
    await db.collection('users').updateOne(
        { _id: user._id }, { $push: { operations: { ...operationData, date, id: Date.now() } } }
    );
    res.sendStatus(200);
}

export async function deleteOperation(req, res) {
    const { id } = req.params;

    await db.collection('users').updateOne(
        { 'operations.id': parseInt(id) },
        { $pull: { operations: { id: parseInt(id) } } }
    );
    res.sendStatus(200);
}

export async function getOneOperation(req, res) {
    const { idOperation } = req.params;

    const operations = (await db.collection('users').findOne({ 'operations.id': parseInt(idOperation) })).operations;
    const operation = operations.find(elem => elem.id === parseInt(idOperation));
    res.send(operation);
}

export async function putOperation(req, res) {
    const operationData = req.body;
    const { idOperation } = req.params;

    await db.collection('users').updateOne(
        { 'operations.id': parseInt(idOperation) },
        { $set: { 'operations.$': { ...operationData, id: parseInt(idOperation) } } }
    );
    res.sendStatus(200);
}