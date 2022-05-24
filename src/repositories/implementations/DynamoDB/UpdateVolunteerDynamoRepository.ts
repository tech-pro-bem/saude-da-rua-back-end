import { AWSError } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Volunteer } from '../../../entities/Volunteer';
import { DynamoDocumentClientCredentials } from '../../../helpers/database/DynamoDocumentClient';
import { IUpdateVolunteerRepository } from '../../interfaces';

export class UpdateVolunteerDynamoRepository
    extends DynamoDocumentClientCredentials
    implements IUpdateVolunteerRepository
{
    private dynamoClientDB: DocumentClient;

    constructor() {
        super();
        this.dynamoClientDB = super.getDynamoClient();
    }

    public async updateVolunteer(
        partialVolunteer: Partial<Volunteer>
    ): Promise<Volunteer | AWSError> {
        const update = await this.dynamoClientDB
            .update({
                TableName: process.env.VOLUNTEERS_TABLE_NAME,
                Key: { id: partialVolunteer.id },

                UpdateExpression:
                    'set fullName = :fullName, birthdate = :birthdate, cellphoneNumberWithDDD = :cellphoneNumberWithDDD, occupation = :occupation, university = :university, semester = :semester, speciality = :speciality, listFreeDaysOfWeek = :listFreeDaysOfWeek, numberOfFreeDaysOfWeek = :numberOfFreeDaysOfWeek, timeOfExperience = :timeOfExperience, howMuchParticipate = :howMuchParticipate, howDidKnowOfSDR = :howDidKnowOfSDR',

                ExpressionAttributeValues: {
                    ':fullName': partialVolunteer.fullName,
                    ':birthdate': partialVolunteer.birthdate,
                    ':cellphoneNumberWithDDD':
                        partialVolunteer.cellphoneNumberWithDDD,
                    ':occupation': partialVolunteer.occupation,
                    ':university': partialVolunteer.university,
                    ':semester': partialVolunteer.semester,
                    ':speciality': partialVolunteer.speciality,
                    ':listFreeDaysOfWeek': partialVolunteer.listFreeDaysOfWeek,
                    ':numberOfFreeDaysOfWeek':
                        partialVolunteer.numberOfFreeDaysOfWeek,
                    ':timeOfExperience': partialVolunteer.timeOfExperience,
                    ':howMuchParticipate': partialVolunteer.howMuchParticipate,
                    ':howDidKnowOfSDR': partialVolunteer.howDidKnowOfSDR,
                },
                ReturnValues: 'UPDATED_NEW',
            })
            .promise();

        return update.Attributes as Partial<Volunteer>;
    }
}
