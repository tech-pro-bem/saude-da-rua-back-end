import {
    occupation,
    semester,
    freeDaysOfWeek,
    howMuchParticipate,
    howDidKnowOfSDR,
} from '../../entities/Volunteer';

type ICreateVolunteerRequestDTO = {
    email: string;
    fullName: string;
    birthdate: string;
    cellphoneNumberWithDDD: string;
    occupation: occupation;
    university?: string;
    semester?: semester;
    speciality?: string;
    listFreeDaysOfWeek: Array<freeDaysOfWeek>;
    timeOfExperience: string;
    howMuchParticipate: howMuchParticipate;
    howDidKnowOfSDR: howDidKnowOfSDR;
};

export default ICreateVolunteerRequestDTO;
