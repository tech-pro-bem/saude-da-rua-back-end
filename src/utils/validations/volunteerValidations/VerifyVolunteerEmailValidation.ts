import Joi, { ObjectSchema, StringSchema } from 'joi';
import { ValidationError } from '../../../helpers/errors';

type queryStringBeforeValidate = {
    [name: string]: string;
};

export class VerifyVolunteerEmailValidation {
    private queryStringParameter: queryStringBeforeValidate;

    private token: StringSchema = Joi.string().trim().required();

    constructor(queryString: queryStringBeforeValidate) {
        this.queryStringParameter = queryString;
    }

    public async validateInput() {
        try {
            const verifyVolunteerEmail: ObjectSchema = Joi.object().keys({
                token: this.token,
            });

            const validatedPayload = await verifyVolunteerEmail.validateAsync(
                this.queryStringParameter
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
