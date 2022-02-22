import Joi, {
    StringSchema,
    ObjectSchema,
    Schema,
    DateSchema,
    ArraySchema,
} from 'joi';
import { ValidationError } from '../../../helpers/errors';
import * as Volunteer from '../../../entities/Volunteers';

type BodyBeforeValidate = {
    [name: string]: any;
};

export class CreateVolunteerValidation {
    private body: BodyBeforeValidate;

    private id: Schema = Joi.forbidden();

    private createdAt: Schema = Joi.forbidden();

    private updatedAt: Schema = Joi.forbidden();

    private fullName: StringSchema = Joi.string()
        .min(3)
        .max(60)
        .pattern(/^[A-Z]{1}[a-zà-ú`]+(\s[A-Z]{1}[a-zà-ú`]+)+$/)
        .trim()
        .required();

    private birthdate: DateSchema = Joi.date().greater('1-1-1900').less('now');

    private email: StringSchema = Joi.string()
        .email({
            tlds: {
                allow: ['com', 'br', 'net'],
            },
        })
        .lowercase()
        .min(15)
        .max(50)
        .trim()
        .required();

    private cellphoneNumberWithDDD: StringSchema = Joi.string()
        .pattern(/^\([1-9]{2}\) 9[1-9][0-9]{3}-[0-9]{4}$/, '(xx) 9xxxx-xxxx')
        .required();

    private occupation: StringSchema = Joi.string()
        .valid(...Object.values(Volunteer.occupation))
        .trim()
        .required();

    private university: StringSchema = Joi.string().trim();

    private semester: StringSchema = Joi.string().valid(
        ...Object.values(Volunteer.semester)
    );

    private speciality: StringSchema = Joi.string().trim();

    private listFreeDaysOfWeek: ArraySchema = Joi.array()
        .unique()
        .max(7)
        .min(1)
        .items(
            Joi.string()
                .valid(...Object.values(Volunteer.freeDaysOfWeek))
                .required()
        )
        .required();

    private timeOfExperience: StringSchema = Joi.string();

    private howMuchParticipate: StringSchema = Joi.string()
        .valid(...Object.values(Volunteer.howMuchParticipate))
        .required();

    private howDidKnowOfSDR: StringSchema = Joi.string()
        .valid(...Object.values(Volunteer.howDidKnowOfSDR))
        .required();

    private createVolunteerValidation: ObjectSchema<any>;

    constructor(body: BodyBeforeValidate) {
        this.body = body;
        this.createVolunteerValidation.keys({
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            fullName: this.fullName,
            birthdate: this.birthdate,
            email: this.email,
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
    }

    public async validateInput() {
        try {
            const validatedPayload =
                await this.createVolunteerValidation.validateAsync(this.body);

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