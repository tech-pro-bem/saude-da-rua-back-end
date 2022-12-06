import Joi, { ObjectSchema } from 'joi';
import { ValidationError } from '../../../helpers/errors';

type data = {
    [name: string]: string;
};

export class CreateMedicinesValidation {
    private data: data;

    id = Joi.forbidden();

    fullName = Joi.string().min(3).max(120).required();

    CEP = Joi.string()
        .pattern(/[0-9]{5}-?[0-9]{3}/)
        .required(); // 01310-100 or 01310100

    state = Joi.string().max(2).required();

    cellPhoneWithDDD = Joi.string()
        .pattern(/^\([1-9]{2}\) 9[1-9][0-9]{3}-[0-9]{4}$/, '(xx) 9xxxx-xxxx')
        .required();

    email = Joi.string().email().required();

    medicines = Joi.array()
        .max(20)
        .items({
            medicineName: Joi.string().max(60).required(),
            milligrams: Joi.number().required(),
            quantity: Joi.number().required(),
            expirationDate: Joi.date().required(),
            pharmaceuticalForm: Joi.string().required(),
        });

    wasRead = Joi.forbidden();

    createdAt = Joi.forbidden();

    updatedAt = Joi.forbidden();

    constructor(data: data) {
        this.data = data;
    }

    public async validateInput() {
        try {
            const createMedicinesValidation: ObjectSchema = Joi.object().keys({
                id: this.id,
                fullName: this.fullName,
                CEP: this.CEP,
                state: this.state,
                cellPhoneWithDDD: this.cellPhoneWithDDD,
                email: this.email,
                medicines: this.medicines,
                wasRead: this.wasRead,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt,
            });

            const validatedPayload =
                await createMedicinesValidation.validateAsync(this.data);

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
