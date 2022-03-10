import { config } from 'dotenv';
import {
    GetVolunteersDynamoRepository,
    CreateVolunteerDynamoRepository,
} from '../../src/repositories/implementations/DynamoDB';
import {
    Volunteer,
    TVolunteerProps,
    occupation,
    freeDaysOfWeek,
    howMuchParticipate,
    howDidKnowOfSDR,
} from '../../src/entities/Volunteer';

config({ path: '.env.test' });

describe('unit test: get volunteers', () => {
    let getVolunteersDynamoRepository: GetVolunteersDynamoRepository;
    let createVolunteerDynamoRepository: CreateVolunteerDynamoRepository;

    beforeAll(async () => {
        getVolunteersDynamoRepository = new GetVolunteersDynamoRepository();
        createVolunteerDynamoRepository = new CreateVolunteerDynamoRepository();

        const data: TVolunteerProps = {
            email: 'loremipsum@gmail.com',
            fullName: 'Lorem Ipsum',
            birthdate: '2022-02-22T14:19:48.437Z',
            cellphoneNumberWithDDD: '(99) 99999-9999',
            occupation: occupation.MEDICO,
            listFreeDaysOfWeek: [freeDaysOfWeek.SEGUNDA, freeDaysOfWeek.QUARTA],
            timeOfExperience: '2',
            howMuchParticipate:
                howMuchParticipate.BETWEEN_TWO_AND_FIVE_PARTICIPATION,
            howDidKnowOfSDR: howDidKnowOfSDR.ANOTHER,
        };

        const data2: TVolunteerProps = {
            email: 'loremipsumAAAA@gmail.com',
            fullName: 'Lorem Ipsum AAAA',
            birthdate: '2022-02-22T14:19:48.437Z',
            cellphoneNumberWithDDD: '(99) 99999-9999',
            occupation: occupation.MEDICO,
            listFreeDaysOfWeek: [freeDaysOfWeek.SEGUNDA, freeDaysOfWeek.QUARTA],
            timeOfExperience: '2',
            howMuchParticipate:
                howMuchParticipate.BETWEEN_TWO_AND_FIVE_PARTICIPATION,
            howDidKnowOfSDR: howDidKnowOfSDR.ANOTHER,
        };

        const newVolunteer = new Volunteer(data);

        const newVolunteer2 = new Volunteer(data2);

        await createVolunteerDynamoRepository.saveVolunteer(newVolunteer);

        await createVolunteerDynamoRepository.saveVolunteer(newVolunteer2);
    });

    test('get 1 volunteers from the first', async () => {
        const response = await getVolunteersDynamoRepository.getVolunteers(
            null,
            1
        );

        const lastEvaluatedKey = response[0];
        const volunteersList = response[1];

        expect(lastEvaluatedKey).toStrictEqual({
            email: 'loremipsumAAAA@gmail.com',
        });

        expect(volunteersList[0]).toStrictEqual({
            fullName: 'Lorem Ipsum AAAA',
            cellphoneNumberWithDDD: '(99) 99999-9999',
            occupation: occupation.MEDICO,
            listFreeDaysOfWeek: [freeDaysOfWeek.SEGUNDA, freeDaysOfWeek.QUARTA],
        });
    });

    test('get 2 volunteers from the first', async () => {
        const response = await getVolunteersDynamoRepository.getVolunteers(
            null,
            3
        );

        const lastEvaluatedKey = response[0];
        const volunteersList = response[1];

        expect(lastEvaluatedKey).toBeUndefined();

        expect(volunteersList[0]).toStrictEqual({
            fullName: 'Lorem Ipsum AAAA',
            cellphoneNumberWithDDD: '(99) 99999-9999',
            occupation: occupation.MEDICO,
            listFreeDaysOfWeek: [freeDaysOfWeek.SEGUNDA, freeDaysOfWeek.QUARTA],
        });

        expect(volunteersList[1]).toStrictEqual({
            fullName: 'Lorem Ipsum',
            cellphoneNumberWithDDD: '(99) 99999-9999',
            occupation: occupation.MEDICO,
            listFreeDaysOfWeek: [freeDaysOfWeek.SEGUNDA, freeDaysOfWeek.QUARTA],
        });
    });
});
