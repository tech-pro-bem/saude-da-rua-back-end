import Joi, { BooleanSchema, ObjectSchema } from 'joi';
import { ValidationError } from '../../../helpers/errors';

type Data = {
    [name: string]: string;
};

export class ListMedicinesValidation {
    constructor(private data: Data) {}

    private wasRead: BooleanSchema = Joi.boolean();

    public async validate() {
        try {
            const listMedicinesValidation: ObjectSchema = Joi.object().keys({
                wasRead: this.wasRead,
            });

            const validatedPayload =
                await listMedicinesValidation.validateAsync(this.data ?? {});

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
