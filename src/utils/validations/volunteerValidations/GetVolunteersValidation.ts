import Joi, { NumberSchema, ObjectSchema, StringSchema } from 'joi';
import { ValidationError } from '../../../helpers/errors';

type queryStringBeforeValidate = {
    [name: string]: string;
};

export class GetVolunteersValidation {
    private queryStringParameters: queryStringBeforeValidate;

    private page: NumberSchema = Joi.number().integer();

    private limit: NumberSchema = Joi.number()
        .integer()
        .positive()
        .min(1)
        .max(100);

    private searchTerm: StringSchema = Joi.string();

    constructor(queryString: queryStringBeforeValidate) {
        this.queryStringParameters = queryString;
    }

    public async validateInput() {
        try {
            const getVolunteersValidation: ObjectSchema = Joi.object().keys({
                page: this.page,
                limit: this.limit,
                searchTerm: this.searchTerm,
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
