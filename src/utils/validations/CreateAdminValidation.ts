import Joi from 'joi';
import { ValidationError } from '../../helpers/errors';

export class CreateAdminValidation {
    private body: { [name: string]: any };

    constructor(body: { [name: string]: any }) {
        this.body = body;
    }

    public async validateInput() {
        const validationSchema = Joi.object().keys({
            id: Joi.forbidden(),

            createdAt: Joi.forbidden(),

            updatedAt: Joi.forbidden(),

            email: Joi.string()
                .pattern(/^\w+([.\-_]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
                .email({
                    tlds: {
                        allow: ['com', 'br', 'net'],
                    },
                })
                .lowercase()
                .required(),

            name: Joi.string()
                .pattern(/^[A-Z]{1}[a-zà-ú`]+\s[A-Z]{1}[a-zà-ú`]+$/)
                .required(),

            password: Joi.string().min(7).required(),
        });

        try {
            const validatedPayload = await validationSchema.validateAsync(
                this.body
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
