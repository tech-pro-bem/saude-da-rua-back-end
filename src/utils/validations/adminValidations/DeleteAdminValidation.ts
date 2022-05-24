import Joi from 'joi';

class DeleteAdminValidation {
    private body: { [email: string]: any };

    constructor(body: { [email: string]: any }) {
        this.body = body;
    }

    public async validateInput() {
        const validationSchema = Joi.object().keys({
            email: Joi.string()
                .pattern(/^\w+([.\-_]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
                .email({
                    tlds: {
                        allow: ['com', 'br', 'net'],
                    },
                })
                .lowercase()
                .required(),
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

export default DeleteAdminValidation;