import db from "../db.js";

export async function validateToken(req, res, next) {
    try {
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');
        if (!token) {
            return res.sendStatus(401)
        }

        const session = await db.collection('sessions').findOne({ token });
        if (!session) {
            return res.sendStatus(401)
        }

        const participant = await db.collection('users').findOne({ _id: session.userId });
        if (!participant) {
            return res.sendStatus(401);
        }

        res.locals.user = participant;

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}