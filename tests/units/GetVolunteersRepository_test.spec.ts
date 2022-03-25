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
            email: 'primeiro_voluntario@gmail.com',
            fullName: 'Primeiro Voluntário',
            birthdate: '2009-05-28T17:30:48.479Z',
            cellphoneNumberWithDDD: '(81) 88888-8888',
            occupation: occupation.MEDICO,
            listFreeDaysOfWeek: [
                freeDaysOfWeek.SEGUNDA,
                freeDaysOfWeek.QUARTA,
                freeDaysOfWeek.QUINTA,
            ],
            timeOfExperience: '3',
            howMuchParticipate:
                howMuchParticipate.BETWEEN_TWO_AND_FIVE_PARTICIPATION,
            howDidKnowOfSDR: howDidKnowOfSDR.ANOTHER,
        };

        const data2: TVolunteerProps = {
            email: 'segundo_voluntario@gmail.com',
            fullName: 'Segundo Voluntário',
            birthdate: '2004-08-17T11:00:00.437Z',
            cellphoneNumberWithDDD: '(18) 99999-9999',
            occupation: occupation.ENFERMEIRO,
            listFreeDaysOfWeek: [
                freeDaysOfWeek.TERCA,
                freeDaysOfWeek.SABADO,
                freeDaysOfWeek.DOMINGO,
            ],
            timeOfExperience: '1',
            howMuchParticipate: howMuchParticipate.MORE_THAN_FIVE_PARTICIPATION,
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
            email: 'primeiro_voluntario@gmail.com',
        });

        expect(volunteersList[0]).toStrictEqual({
            fullName: 'Primeiro Voluntário',
            cellphoneNumberWithDDD: '(81) 88888-8888',
            occupation: occupation.MEDICO,
            listFreeDaysOfWeek: [
                freeDaysOfWeek.SEGUNDA,
                freeDaysOfWeek.QUARTA,
                freeDaysOfWeek.QUINTA,
            ],
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
            fullName: 'Primeiro Voluntário',
            cellphoneNumberWithDDD: '(81) 88888-8888',
            occupation: occupation.MEDICO,
            listFreeDaysOfWeek: [
                freeDaysOfWeek.SEGUNDA,
                freeDaysOfWeek.QUARTA,
                freeDaysOfWeek.QUINTA,
            ],
        });

        expect(volunteersList[1]).toStrictEqual({
            fullName: 'Segundo Voluntário',
            cellphoneNumberWithDDD: '(18) 99999-9999',
            occupation: occupation.ENFERMEIRO,
            listFreeDaysOfWeek: [
                freeDaysOfWeek.TERCA,
                freeDaysOfWeek.SABADO,
                freeDaysOfWeek.DOMINGO,
            ],
        });
    });
});
