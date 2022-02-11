import db from "../db.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';


export async function signUp(req, res) {
    const user = req.body;

    const userFinded = await db.collection('users').findOne({ email: user.email });
    if (userFinded) {
        res.status(409).send('Usuário já existente');
        return;
    }

    const encryptedPassword = bcrypt.hashSync(user.password, 10);
    await db.collection('users').insertOne({ ...user, password: encryptedPassword, operations: [] });

    res.status(201).send('Criado com sucesso');
}

export async function signIn(req, res) {
    const user = req.body;

    const userFinded = await db.collection('users').findOne({ email: user.email });

    if (!userFinded) {
        res.status(401).send('Usuário não encontrado');
        return;

    } else if (bcrypt.compareSync(user.password, userFinded.password)) {
        const token = uuid();
        await db.collection('sessions').insertOne({ userId: userFinded._id, token });

        delete userFinded.password;
        delete userFinded.operations;
        res.send({ ...userFinded, token });
    } else {
        res.status(401).send('Usuário ou senha errada');
    }
}