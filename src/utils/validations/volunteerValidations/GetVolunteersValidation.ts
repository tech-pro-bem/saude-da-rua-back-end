import Joi, { NumberSchema, ObjectSchema, StringSchema } from 'joi';
import { ValidationError } from '../../../helpers/errors';

type queryStringBeforeValidate = {
    [name: string]: string;
};

export class GetVolunteersValidation {
    private queryStringParameters: queryStringBeforeValidate;

    private offset: StringSchema = Joi.string()
        .email({
            tlds: {
                allow: ['com', 'br', 'net'],
            },
        })
        .lowercase()
        .min(15)
        .max(50)
        .trim();

    private limit: NumberSchema = Joi.number()
        .integer()
        .positive()
        .min(1)
        .max(10)
        .required();

    constructor(queryString: queryStringBeforeValidate) {
        this.queryStringParameters = queryString;
    }

    public async validateInput() {
        try {
            const getVolunteersValidation: ObjectSchema = Joi.object().keys({
                offset: this.offset,
                limit: this.limit,
            });

            const validatedPayload =
                await getVolunteersValidation.validateAsync(
                    this.queryStringParameters
                );

            return validatedPayload;
        } catch (error) {
            const getDetailsError: string = error.details[0].message;
            const transformInFriendlyError = getDetailsError.replace(
                /"/g,
                '***'
            );

            throw new ValidationError(transformInFriendlyError);
        }
    }
}
