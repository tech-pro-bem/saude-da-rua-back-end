import {
    AttributeValue,
    DocumentClient,
    UpdateItemInput,
} from 'aws-sdk/clients/dynamodb';
import { DynamoDocumentClientCredentials } from '../../../helpers/database/DynamoDocumentClient';
import { IVerifyVolunteerEmailRepository } from '../../interfaces';

export class VerifyVolunteerEmailDynamoRepository
    extends DynamoDocumentClientCredentials
    implements IVerifyVolunteerEmailRepository
{
    private dynamoClientDB: DocumentClient;

    constructor() {
        super();
        this.dynamoClientDB = super.getDynamoClient();
    }

    public async setVerifiedEmailToTrue(email: string): Promise<void> {
        const updateVolunteerInput: UpdateItemInput = {
            TableName: process.env.VOLUNTEERS_TABLE_NAME,
            Key: {
                email: email as AttributeValue,
            },
            UpdateExpression: 'set #property = :value',
            ExpressionAttributeNames: {
                '#property': 'verifiedEmail',
            },
            ExpressionAttributeValues: {
                ':value': true as AttributeValue,
            },
        };

        await this.dynamoClientDB.update(updateVolunteerInput).promise();
    }
}
