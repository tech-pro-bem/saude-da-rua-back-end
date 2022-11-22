import Joi, { BooleanSchema, ObjectSchema, StringSchema } from 'joi';
import { ValidationError } from '../../../helpers/errors';

type data = {
    [name: string]: string;
};

export class UpdateCurrentlyParticipationValidation {
    private data: data;

    private id: StringSchema = Joi.string().uuid().required();

    private currentlyParticipation: BooleanSchema = Joi.boolean().required();

    constructor(data: data) {
        this.data = data;
    }

    public async validateInput() {
        try {
            const updateCurrentlyParticipationValidation: ObjectSchema =
                Joi.object().keys({
                    id: this.id,
                    currentlyParticipation: this.currentlyParticipation,
                });

            const validatedPayload =
                await updateCurrentlyParticipationValidation.validateAsync(
                    this.data
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
