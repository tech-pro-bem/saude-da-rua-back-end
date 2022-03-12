import { AWSError } from 'aws-sdk';
import {
    DocumentClient,
    QueryInput,
    AttributeValue,
    QueryOutput,
} from 'aws-sdk/clients/dynamodb';
import { Volunteer } from '../../../entities/Volunteer';
import { IGetOneVolunteerRepository } from '../../interfaces';
import { DynamoDocumentClientCredentials } from '../../../helpers/database/DynamoDocumentClient';

export class GetOneVolunteerDynamoRepository
    extends DynamoDocumentClientCredentials
    implements IGetOneVolunteerRepository
{
    private dynamoClientDB: DocumentClient;

    constructor() {
        super();
        this.dynamoClientDB = super.getDynamoClient();
    }

    public async getVolunteer(email: string): Promise<Volunteer> {
        const queryVolunteerParams: QueryInput = {
            TableName: process.env.VOLUNTEERS_TABLE_NAME,
            KeyConditionExpression: '#email = :selectedEmail',
            ExpressionAttributeNames: {
                '#email': 'email',
            },
            ExpressionAttributeValues: {
                ':selectedEmail': email as AttributeValue,
            },
        };

        const getVolunteerInfo: QueryOutput | AWSError =
            await this.dynamoClientDB.query(queryVolunteerParams).promise();

        return getVolunteerInfo.Items[0];
    }
}
