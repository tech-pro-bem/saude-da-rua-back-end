import { constEnumType } from '../../../../utils/ConstEnumType';
import {
    freeDaysOfWeek,
    occupation,
    howMuchParticipate,
    semester,
} from '../../entities/Volunteer';

type ICreateVolunteerRequestDTO = {
    email: string;
    fullName: string;
    birthdate: string;
    cellphoneNumberWithDDD: string;
    occupation: constEnumType<typeof occupation>;
    university?: string;
    semester?: constEnumType<typeof semester>;
    speciality?: string;
    listFreeDaysOfWeek: Array<constEnumType<typeof freeDaysOfWeek>>;
    timeOfExperience?: string;
    course?: string;
    observations?: string;
    howMuchParticipate: constEnumType<typeof howMuchParticipate>;
    howDidKnowOfSDR: string;
};

export { ICreateVolunteerRequestDTO };
