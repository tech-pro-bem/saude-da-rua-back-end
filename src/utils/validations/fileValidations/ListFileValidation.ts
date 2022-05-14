import Joi, { ObjectSchema, StringSchema } from 'joi';
import { FileType } from '../../../entities/File';
import { ValidationError } from '../../../helpers/errors';

type queryStringBeforeValidate = {
    [name: string]: string;
};

export class ListFileValidation {
    private queryStringParameter: queryStringBeforeValidate;

    private fileType: StringSchema = Joi.string()
        .valid(...Object.values(FileType))
        .required();

    constructor(queryString: queryStringBeforeValidate) {
        this.queryStringParameter = queryString;
    }

    public async validateInput() {
        try {
            const listFileValidation: ObjectSchema = Joi.object().keys({
                fileType: this.fileType,
            });

            const validatedPayload = await listFileValidation.validateAsync(
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
