import Joi, { ObjectSchema, StringSchema } from "joi";
import { validate } from "uuid";
import { ValidationError } from "../../../helpers/errors";

type queryStringBeforeValidate = {
    [name: string]: any;
};

export class DeleteFileValidation {
    private queryStringParameter: queryStringBeforeValidate;

    private fileId: StringSchema = Joi.string().guid({
        version: [
            'uuidv4',
            'uuidv5'
        ]
    });

    constructor(queryStringParameter: queryStringBeforeValidate) {
        this.queryStringParameter = queryStringParameter;
    }

    public async validateInput() {
        try{
            const deleteFileValidation: ObjectSchema = Joi.object().keys({
                fileId: this.fileId
            });

            const validatedPayload = await deleteFileValidation.validateAsync(this.queryStringParameter);

            return validatedPayload;
        } catch(error) {
            const getDetailsError: string = error.details[0].message;
            const transformInFriendlyError = getDetailsError.replace(
                /"/g,
                '***'
            );

            throw new ValidationError(transformInFriendlyError);
        }
    }
}