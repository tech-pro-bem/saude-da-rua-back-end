import Joi, { ObjectSchema, StringSchema } from 'joi';
import { ValidationError } from '../../../helpers/errors';
import { participation } from '../../../modules/volunteers/entities/Volunteer';

type data = {
    [name: string]: string;
};

export class UpdateVolunteerParticipationValidation {
    private data: data;

    private id: StringSchema = Joi.string().uuid().required();

    private participation: StringSchema = Joi.string()
        .valid(...Object.values(participation))
        .required();

    constructor(data: data) {
        this.data = data;
    }

    public async validateInput() {
        try {
            const updateVolunteerParticipationValidation: ObjectSchema =
                Joi.object().keys({
                    id: this.id,
                    participation: this.participation,
                });

            const validatedPayload =
                await updateVolunteerParticipationValidation.validateAsync(
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
