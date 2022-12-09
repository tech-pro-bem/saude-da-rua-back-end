import Joi, { ObjectSchema, StringSchema } from 'joi';
import { ValidationError } from '../../../helpers/errors';

type Data = {
    [name: string]: string;
};

export class UpdatePixKeyValidation {
    constructor(private data: Data) {}

    private key: StringSchema = Joi.string().min(1).max(50).required();

    public async validate() {
        try {
            const updatePixKeyValidation: ObjectSchema = Joi.object().keys({
                key: this.key,
            });

            const validatedPayload = await updatePixKeyValidation.validateAsync(
                this.data ?? {}
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
