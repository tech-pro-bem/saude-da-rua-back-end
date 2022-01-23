import Joi from 'joi';

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
            throw new Error('400');
        }
    }
}

export default LoginAdminValidation;
