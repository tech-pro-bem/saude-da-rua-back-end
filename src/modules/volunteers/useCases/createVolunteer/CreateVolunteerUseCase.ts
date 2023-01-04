import { ICreateVolunteerRequestDTO } from './CreateVolunteerRequestDTO';
import { IVolunteersRepository } from '../../repositories/IVolunteersRepository';
import { ConflictError } from '../../../../helpers/errors';
import { Volunteer } from '../../entities/Volunteer';
import { IVolunteersNotificationRepository } from '../../repositories/IVolunteersNotificationRepository';

class CreateVolunteerUseCase {
    private volunteersRepository: IVolunteersRepository;

    private volunteersNotificationRepository: IVolunteersNotificationRepository;

    private publishTopicWithEmail: string;

    constructor(
        volunteersRepository: IVolunteersRepository,
        volunteersNotificationRepository: IVolunteersNotificationRepository
    ) {
        this.volunteersRepository = volunteersRepository;
        this.volunteersNotificationRepository =
            volunteersNotificationRepository;
    }

    async execute(createVolunteerRequestData: ICreateVolunteerRequestDTO) {
        const {
            email,
            fullName,
            birthdate,
            cellphoneNumberWithDDD,
            occupation,
            university,
            course,
            semester,
            speciality,
            observations,
            listFreeDaysOfWeek,
            timeOfExperience,
            howMuchParticipate,
            howDidKnowOfSDR,
        } = createVolunteerRequestData;

        this.publishTopicWithEmail = email;

        const VolunteerAlreadyExists: boolean =
            await this.volunteersRepository.checkIfVolunteerExistsByEmail(
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
            course,
            semester,
            speciality,
            observations,
            listFreeDaysOfWeek,
            timeOfExperience,
            howMuchParticipate,
            howDidKnowOfSDR,
        });

        await this.volunteersRepository.saveVolunteer(newVolunteer);
    }

    async publishNewVolunteer(): Promise<void> {
        await this.volunteersNotificationRepository.publishNewVolunteer(
            this.publishTopicWithEmail
        );
    }
}

export default CreateVolunteerUseCase;
