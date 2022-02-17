import Joi, { StringSchema, ObjectSchema, Schema } from 'joi';
import { ValidationError } from '../../helpers/errors';
import AdminValidationBase from './AdminValidationBase';

type BodyBeforeValidate = {
    [name: string]: any;
};

export class CreateAdminValidation extends AdminValidationBase {
    private body: BodyBeforeValidate;

    private createAdminValidation: ObjectSchema<any>;

    private id: Schema = Joi.forbidden();

    private createdAt: Schema = Joi.forbidden();

    private updatedAt: Schema = Joi.forbidden();

    private name: StringSchema = Joi.string().required();

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
            const getDetailsError: string = error.details[0].message;
            const transformInFriendlyError = getDetailsError.replace(
                /"/g,
                '***'
            );

            throw new ValidationError(transformInFriendlyError);
        }
    }
}
