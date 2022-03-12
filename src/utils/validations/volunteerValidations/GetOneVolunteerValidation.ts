import Joi, { ObjectSchema, StringSchema } from 'joi';
import { ValidationError } from '../../../helpers/errors';

type queryStringBeforeValidate = {
    [name: string]: string;
};

export class GetOneVolunteerValidation {
    private queryStringParameters: queryStringBeforeValidate;

    private email: StringSchema = Joi.string()
        .email({
            tlds: {
                allow: ['com', 'br', 'net'],
            },
        })
        .lowercase()
        .min(15)
        .max(50)
        .trim()
        .required();

    constructor(queryString: queryStringBeforeValidate) {
        this.queryStringParameters = queryString;
    }

    public async validateInput() {
        try {
            const getOneVolunteerValidation: ObjectSchema = Joi.object().keys({
                email: this.email,
            });

            const validatedPayload =
                await getOneVolunteerValidation.validateAsync(
                    this.queryStringParameters,
                    { convert: false }
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
