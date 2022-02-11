import signUpSchema from '../schemas/signUpSchema.js';

export default function validatesignUpSchema(req, res, next) {
    const validation = signUpSchema.validate(req.body);

    if (validation.error) {
        return res.sendStatus(422);
    }

    next();
}