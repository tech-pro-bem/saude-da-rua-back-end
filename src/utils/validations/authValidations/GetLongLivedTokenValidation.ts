import Joi, { ObjectSchema, StringSchema } from 'joi';
import { ValidationError } from '../../../helpers/errors';

type queryStringBeforeValidate = {
    [name: string]: string;
};
export class GetLongLivedTokenValidation {
    private code: StringSchema = Joi.string().required();

    private secret: StringSchema = Joi.string().required();

    constructor(private queryStringParameters: queryStringBeforeValidate) {}

    public async validate() {
        try {
            const getLongLivedTokenValidation: ObjectSchema = Joi.object().keys(
                {
                    code: this.code,
                    state: this.secret,
                }
            );

            const validatedPayload =
                await getLongLivedTokenValidation.validateAsync(
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
