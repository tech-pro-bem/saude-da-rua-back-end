import { faker } from '@faker-js/faker';
import {
    Volunteer,
    VolunteerProps,
} from '../../src/modules/volunteers/entities/Volunteer';
import { IVolunteersRepository } from '../../src/modules/volunteers/repositories/IVolunteersRepository';

type GetRandomVolunteerOptions = {
    repository?: IVolunteersRepository;
    customAttributes?: VolunteerProps;
};

export async function getRandomVolunteer(options?: GetRandomVolunteerOptions) {
    const volunteer = new Volunteer({
        birthdate: faker.date.birthdate().toString(),
        cellphoneNumberWithDDD: '(xx) 9xxx-xxxx',
        email: faker.internet.email(),
        fullName: faker.name.fullName(),
        howDidKnowOfSDR: faker.hacker.phrase(),
        hasParticipated: 'NOT_PARTICIPATED',
        listFreeDaysOfWeek: ['DOMINGO', 'QUARTA'],
        occupation: 'ESTUDANTE',
        ...options?.customAttributes,
    });

    if (options?.repository) {
        await options.repository.saveVolunteer(volunteer);
    }

    return volunteer;
}
