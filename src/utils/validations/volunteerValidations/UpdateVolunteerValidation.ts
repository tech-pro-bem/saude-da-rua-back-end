import Joi, {
    ArraySchema,
    BooleanSchema,
    DateSchema,
    ObjectSchema,
    Schema,
    StringSchema,
} from 'joi';
import { ValidationError } from '../../../helpers/errors';
import * as Volunteer from '../../../modules/volunteers/entities/Volunteer';

type data = {
    [name: string]: string;
};

export class UpdateVolunteerValidation {
    private data: data;

    private id: Schema = Joi.forbidden();

    private createdAt: Schema = Joi.forbidden();

    private updatedAt: Schema = Joi.forbidden();

    private email: StringSchema = Joi.string()
        .email({
            tlds: {
                allow: ['com', 'br', 'net'],
            },
        })
        .lowercase()
        .min(15)
        .max(50)
        .trim();

    private fullName: StringSchema = Joi.string().min(3).max(100).trim();

    private birthdate: DateSchema = Joi.date().greater('1-1-1900').less('now');

    private cellphoneNumberWithDDD: StringSchema = Joi.string().pattern(
        /^\([1-9]{2}\) 9[1-9][0-9]{3}-[0-9]{4}$/,
        '(xx) 9xxxx-xxxx'
    );

    private occupation: StringSchema = Joi.string()
        .valid(...Object.values(Volunteer.occupation))
        .trim();

    private university: StringSchema = Joi.string().trim().allow('');

    private semester: StringSchema = Joi.string()
        .valid(...Object.values(Volunteer.semester))
        .allow('');

    private speciality: StringSchema = Joi.string().trim().allow('');

    private listFreeDaysOfWeek: ArraySchema = Joi.array()
        .unique()
        .max(7)
        .min(1)
        .items(
            Joi.string()
                .valid(...Object.values(Volunteer.freeDaysOfWeek))
                .required()
        );

    private timeOfExperience: StringSchema = Joi.string();

    private howMuchParticipate: StringSchema = Joi.string().valid(
        ...Object.values(Volunteer.howMuchParticipate)
    );

    private howDidKnowOfSDR: StringSchema = Joi.string().min(1).max(80);

    private currentlyParticipation: BooleanSchema = Joi.boolean();

    private isCurrentlyParticipating: BooleanSchema = Joi.boolean();

    constructor(data: data) {
        this.data = data;
    }

    public async validateInput() {
        try {
            const updateCurrentlyParticipationValidation: ObjectSchema =
                Joi.object()
                    .keys({
                        id: this.id,
                        createdAt: this.createdAt,
                        updatedAt: this.updatedAt,
                        email: this.email,
                        fullName: this.fullName,
                        birthdate: this.birthdate,
                        cellphoneNumberWithDDD: this.cellphoneNumberWithDDD,
                        occupation: this.occupation,
                        university: this.university,
                        semester: this.semester,
                        speciality: this.speciality,
                        listFreeDaysOfWeek: this.listFreeDaysOfWeek,
                        timeOfExperience: this.timeOfExperience,
                        howMuchParticipate: this.howMuchParticipate,
                        howDidKnowOfSDR: this.howDidKnowOfSDR,
                        currentlyParticipation: this.currentlyParticipation,
                        isCurrentlyParticipating: this.isCurrentlyParticipating,
                    })
                    .required()
                    // Be backwards compatible with the old endpoint
                    .rename(
                        'currentlyParticipation',
                        'isCurrentlyParticipating',
                        {
                            override: true,
                        }
                    );

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
