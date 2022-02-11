import operationSchema from '../schemas/operationSchema.js';

export default function validateOperationSchema(req, res, next) {
    const validation = operationSchema.validate(req.body);

    if (validation.error) {
        return res.sendStatus(422);
    }

    next();
}