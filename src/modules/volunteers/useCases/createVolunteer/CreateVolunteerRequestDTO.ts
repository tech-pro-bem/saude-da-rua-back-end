import { constEnumType } from '../../../../utils/ConstEnumType';
import {
    freeDaysOfWeek,
    occupation,
    participation,
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
    hasParticipated: constEnumType<typeof participation>;
    howDidKnowOfSDR: string;
};

export { ICreateVolunteerRequestDTO };
