import { Volunteer } from '../../entities/Volunteer';
import {
    ICreateVolunteerRepository,
    IPublishTopicToSendEmailRepository,
} from '../../repositories/interfaces';
import ICreateVolunteerRequestDTO from './CreateVolunteerRequestDTO';
import { ConflictError } from '../../helpers/errors';

class CreateVolunteerUseCase {
    private createVolunteerRepository: ICreateVolunteerRepository;

    private publishTopicToSendEmail: IPublishTopicToSendEmailRepository;

    private publishTopicWithEmail: string;

    constructor(
        createVolunteerRepository: ICreateVolunteerRepository,
        publishTopicToSendEmail: IPublishTopicToSendEmailRepository
    ) {
        this.createVolunteerRepository = createVolunteerRepository;
        this.publishTopicToSendEmail = publishTopicToSendEmail;
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

        this.publishTopicWithEmail = email;

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

    async publishTopicSendEmail(): Promise<void> {
        await this.publishTopicToSendEmail.publishTopic(
            this.publishTopicWithEmail
        );
    }
}

export default CreateVolunteerUseCase;
