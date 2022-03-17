import { config } from 'dotenv';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { GetVolunteersDynamoRepository } from '../../src/repositories/implementations/DynamoDB';
import {
    TVolunteerProps,
    occupation,
    freeDaysOfWeek,
    howMuchParticipate,
    howDidKnowOfSDR,
} from '../../src/entities/Volunteer';

config({ path: '.env.test' });

describe('unit test: get volunteers', () => {
    let getVolunteersDynamoRepository: GetVolunteersDynamoRepository;

    beforeAll(async () => {
        getVolunteersDynamoRepository = new GetVolunteersDynamoRepository();

        const jestConfig = {
            region: 'local-env',
            endpoint: 'http://localhost:8000',
            sslEnabled: false,
        };

        const ddb = new DocumentClient(jestConfig);

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

        await ddb
            .put({
                TableName: process.env.VOLUNTEERS_TABLE_NAME,
                Item: data,
            })
            .promise();

        await ddb
            .put({
                TableName: process.env.VOLUNTEERS_TABLE_NAME,
                Item: data2,
            })
            .promise();
    });

    test('get 1 volunteers from the first', async () => {
        const response = await getVolunteersDynamoRepository.getVolunteers(
            undefined,
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
            undefined,
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
