import { faker } from '@faker-js/faker';
import {
    Medicine,
    MedicineProps,
} from '../../src/modules/medicines/entities/Medicine';
import { IMedicinesRepository } from '../../src/modules/medicines/repositories/IMedicinesRepository';
import {
    Volunteer,
    VolunteerProps,
} from '../../src/modules/volunteers/entities/Volunteer';
import { IVolunteersRepository } from '../../src/modules/volunteers/repositories/IVolunteersRepository';

type GetRandomVolunteerOptions = {
    repository?: IVolunteersRepository;
    customAttributes?: VolunteerProps;
};
type GetRandomMedicineOptions = {
    repository?: IMedicinesRepository;
    customAttributes?: MedicineProps;
};

export async function getRandomVolunteer(options?: GetRandomVolunteerOptions) {
    const volunteer = new Volunteer({
        birthdate: faker.date.birthdate().toString(),
        cellphoneNumberWithDDD: '(xx) 9xxx-xxxx',
        email: faker.internet.email(),
        fullName: faker.name.fullName(),
        howDidKnowOfSDR: faker.hacker.phrase(),
        howMuchParticipate: 'NOT_PARTICIPATED',
        listFreeDaysOfWeek: ['DOMINGO', 'QUARTA'],
        occupation: 'ESTUDANTE',
        ...options?.customAttributes,
    });

    if (options?.repository) {
        await options.repository.saveVolunteer(volunteer);
    }

    return volunteer;
}

export async function getRandomMedicine(options?: GetRandomMedicineOptions) {
    const medicine = new Medicine({
        CEP: faker.address.zipCode('#####-###'),
        email: faker.internet.email(),
        expirationDate: faker.date.soon(),
        fullName: faker.name.fullName(),
        medicineName: faker.hacker.phrase(),
        milligrams: Number(faker.random.numeric(2)),
        pharmaceuticalForm: 'solid',
        cellPhoneWithDDD: faker.phone.number('(11) #####-####'),
        quantity: Number(faker.random.numeric(1)),
        state: faker.address.state(),
        wasRead: false,
        ...options?.customAttributes,
    });

    if (options?.repository) {
        await options.repository.save(medicine);
    }

    return medicine;
}
