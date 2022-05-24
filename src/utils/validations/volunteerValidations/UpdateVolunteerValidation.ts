// import Joi for validation
import Joi, { ObjectSchema, StringSchema, DateSchema, ArraySchema } from 'joi';
import { ValidationError } from '../../../helpers/errors';
import * as Volunteer from '../../../entities/Volunteer';

type BodyBeforeValidate = {
    [name: string]: any;
};

export class UpdateVolunteerValidation {
    private body: BodyBeforeValidate;

    private fullName: StringSchema = Joi.string()
        .min(3)
        .max(60)
        .pattern(/^[A-Z]{1}[a-zà-ú`]+(\s[A-Z]{1}[a-zà-ú`]+)+$/)
        .trim()
        .optional();

    private birthdate: DateSchema = Joi.date()
        .greater('1-1-1900')
        .less('now')
        .optional();

    private cellphoneNumberWithDDD: StringSchema = Joi.string()
        .pattern(/^\([1-9]{2}\) 9[1-9][0-9]{3}-[0-9]{4}$/, '(xx) 9xxxx-xxxx')
        .optional();

    private occupation: StringSchema = Joi.string()
        .valid(...Object.values(Volunteer.occupation))
        .trim()
        .optional();

    private university: StringSchema = Joi.string().trim().optional();

    private semester: StringSchema = Joi.string()
        .valid(...Object.values(Volunteer.semester))
        .optional();

    private speciality: StringSchema = Joi.string().trim().optional();

    private listFreeDaysOfWeek: ArraySchema = Joi.array()
        .unique()
        .max(7)
        .min(1)
        .items(Joi.string().valid(...Object.values(Volunteer.freeDaysOfWeek)))
        .optional();

    private timeOfExperience: StringSchema = Joi.string().optional();

    private howMuchParticipate: StringSchema = Joi.string()
        .valid(...Object.values(Volunteer.howMuchParticipate))
        .optional();

    private howDidKnowOfSDR: StringSchema = Joi.string()
        .valid(...Object.values(Volunteer.howDidKnowOfSDR))
        .optional();

    constructor(body: BodyBeforeValidate) {
        this.body = body;
    }

    public async validateUpdate() {
        try {
            const UpdateVolunteerValidation: ObjectSchema = Joi.object().keys({
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
            });

            const validatePayload =
                await UpdateVolunteerValidation.validateAsync(this.body, {
                    abortEarly: false,
                    convert: true,
                });

            return validatePayload;
        } catch (error) {
            type TErrorDetails = {
                message: string;
                path: Array<string>;
                type: string;
                context: unknown;
            };

            let allErrorMessages = '';
            let firstInteract = true;

            const errorDetails: Array<TErrorDetails> = error.details;

            errorDetails.forEach((details) => {
                const pretfifyErrors = details.message.replace(/"/g, '***');

                if (firstInteract === true) {
                    allErrorMessages = `${pretfifyErrors}`;
                    firstInteract = false;
                } else {
                    allErrorMessages = `${allErrorMessages} && ${pretfifyErrors}`;
                }
            });

            throw new ValidationError(allErrorMessages);
        }
    }
}
