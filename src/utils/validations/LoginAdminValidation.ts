import Joi from 'joi';
import { ValidationError } from '../../helpers/errors';

interface IEventBody {
    [name: string]: any;
}

class LoginAdminValidation {
    private body: IEventBody;

    constructor(body: IEventBody) {
        this.body = body;
    }

    public async validateInput() {
        const joiSchema = Joi.object().keys({
            email: Joi.string()
                .pattern(/^\w+([.\-_]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
                .email({
                    tlds: {
                        allow: ['com', 'br', 'net'],
                    },
                })
                .lowercase()
                .required(),

            password: Joi.string().min(7).required(),
        });

        try {
            const validatedPayload = await joiSchema.validateAsync(this.body);

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

export default LoginAdminValidation;
