import joi from 'joi';

const operationSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().required().valid('exit', 'input'),
    date: joi.string()
});

export default operationSchema;