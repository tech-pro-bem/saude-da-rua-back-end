import { Volunteer } from '../../entities/Volunteer';
import { ICreateVolunteerRepository } from '../../repositories/interfaces';
import ICreateVolunteerRequestDTO from './CreateVolunteerRequestDTO';
import { ConflictError } from '../../helpers/errors';

class CreateVolunteerUseCase {
    private createVolunteerRepository: ICreateVolunteerRepository;

    constructor(createVolunteerRepository: ICreateVolunteerRepository) {
        this.createVolunteerRepository = createVolunteerRepository;
    }

    async execute(createVolunteerRequestData: ICreateVolunteerRequestDTO) {
        const {
            email,
            fullName,
            birthdate,
            cellphoneNumberWithDDD,
            occupation,
            university,
            semester,
            speciality,
            listFreeDaysOfWeek,
            timeOfExperience,
            howMuchParticipate,
            howDidKnowOfSDR,
        } = createVolunteerRequestData;

        const VolunteerAlreadyExists: boolean =
            await this.createVolunteerRepository.checkIfVolunteerExistsByEmail(
                email
            );

        if (VolunteerAlreadyExists === true) {
            throw new ConflictError(
                'There is an volunteer account with that email'
            );
        }

        const newVolunteer = new Volunteer({
            email,
            fullName,
            birthdate,
            cellphoneNumberWithDDD,
            occupation,
            university,
            semester,
            speciality,
            listFreeDaysOfWeek,
            timeOfExperience,
            howMuchParticipate,
            howDidKnowOfSDR,
        });

        await this.createVolunteerRepository.saveVolunteer(newVolunteer);
    }
}

export default CreateVolunteerUseCase;
