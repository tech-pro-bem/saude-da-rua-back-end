import Joi from 'joi';

class CreateAdminValidation {
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
            throw new Error('400');
        }
    }
}

export default CreateAdminValidation;
