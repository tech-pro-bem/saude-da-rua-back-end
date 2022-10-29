import Joi, { StringSchema, ObjectSchema, Schema } from 'joi';
import { ValidationError } from '../../../helpers/errors';
import AdminValidationBase from './AdminValidationBase';

type BodyBeforeValidate = {
    [name: string]: unknown;
};

type ErrorDetails = {
    message: string;
    path: Array<string>;
    type: string;
    context: unknown;
};

export class CreateAdminValidation extends AdminValidationBase {
    private body: BodyBeforeValidate;

    private createAdminValidation: ObjectSchema<unknown>;

    private id: Schema = Joi.forbidden();

    private createdAt: Schema = Joi.forbidden();

    private updatedAt: Schema = Joi.forbidden();

    private name: StringSchema = Joi.string()
        .pattern(/^[A-Z]{1}[a-zà-ú`]+\s[A-Z]{1}[a-zà-ú`]+$/)
        .required();

    constructor(body: BodyBeforeValidate) {
        super();
        this.createAdminValidation = super.adminValidationBase.keys({
            id: this.id,
            createdAt: this.createdAt,
            upddatedAt: this.updatedAt,
            name: this.name,
        });
        this.body = body;
    }

    public async validateInput() {
        try {
            const validatedPayload =
                await this.createAdminValidation.validateAsync(this.body);

            return validatedPayload;
        } catch (error) {
            let allErrorMessages = '';
            let firstInteract = true;

            const errorDetails: Array<ErrorDetails> = error.details;

            errorDetails.forEach((details) => {
                const pretfifyErrors = details.message.replace(/"/g, '***');

                if (firstInteract === true) {
                    allErrorMessages = `${pretfifyErrors}`;
                    firstInteract = false;
                } else {
                    allErrorMessages = `${allErrorMessages} && ${pretfifyErrors}`;
                }
            });

            throw new ValidationError(allErrorMessages);
        }
    }
}
