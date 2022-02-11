import signInSchema from '../schemas/signInSchema.js';

export default function validatesignInSchema(req, res, next) {
    const validation = signInSchema.validate(req.body);

    if (validation.error) {
        return res.sendStatus(422);
    }

    next();
}