import {
    occupation,
    semester,
    freeDaysOfWeek,
    howMuchParticipate,
    howDidKnowOfSDR,
} from '../../entities/Volunteer';
import { constEnumType } from '../../utils/ConstEnumType';

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
    timeOfExperience: string;
    howMuchParticipate: constEnumType<typeof howMuchParticipate>;
    howDidKnowOfSDR: constEnumType<typeof howDidKnowOfSDR>;
};

export default ICreateVolunteerRequestDTO;
