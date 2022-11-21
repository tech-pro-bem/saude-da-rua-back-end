import Joi, { NumberSchema, ObjectSchema, StringSchema } from 'joi';
import { ValidationError } from '../../../helpers/errors';

type queryStringBeforeValidate = {
    [name: string]: string;
};

export class GetAdminsValidation {
    private queryStringParameters: queryStringBeforeValidate;

    private lastAdminId: StringSchema = Joi.string().uuid();

    private limit: NumberSchema = Joi.number()
        .integer()
        .positive()
        .min(1)
        .max(100)
        .required();

    constructor(queryString: queryStringBeforeValidate) {
        this.queryStringParameters = queryString;
    }

    public async validateInput() {
        try {
            const getAdminsValidation: ObjectSchema = Joi.object().keys({
                lastAdminId: this.lastAdminId,
                limit: this.limit,
            });

            const validatedPayload =
                await getAdminsValidation.validateAsync(
                    this.queryStringParameters
                );
            
            console.log(validatedPayload)
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
