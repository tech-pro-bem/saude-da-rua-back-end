import { AWSError } from 'aws-sdk';
import {
    DocumentClient,
    QueryInput,
    AttributeValue,
    QueryOutput,
} from 'aws-sdk/clients/dynamodb';
import Admin from '../../../entities/Admin';
import { ILoginAdminRepository } from '../../interfaces';
import { DynamoDocumentClientCredentials } from '../../../helpers/database/DynamoDocumentClient';

export class LoginAdminDynamoRepository
    extends DynamoDocumentClientCredentials
    implements ILoginAdminRepository
{
    private dynamoClientDB: DocumentClient;

    constructor() {
        super();
        this.dynamoClientDB = super.getDynamoClient();
    }

    async getAdminInfoByEmail(email: string): Promise<Admin | AWSError> {
        const queryAdminParams: QueryInput = {
            TableName: process.env.ADMINS_TABLE_NAME,
            KeyConditionExpression: '#email = :email',
            ExpressionAttributeNames: {
                '#email': 'email',
            },
            ExpressionAttributeValues: {
                ':email': email as AttributeValue,
            },
            ProjectionExpression: 'email, permissionLevel, password',
        };

        const getAdminInfo: QueryOutput | AWSError = await this.dynamoClientDB
            .query(queryAdminParams)
            .promise();

        return getAdminInfo.Items[0];
    }
}
