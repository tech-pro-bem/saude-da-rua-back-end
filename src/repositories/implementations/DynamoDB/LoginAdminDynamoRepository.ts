import { AWSError, DynamoDB } from 'aws-sdk';
import {
    DocumentClient,
    QueryInput,
    AttributeValue,
    QueryOutput,
} from 'aws-sdk/clients/dynamodb';
import Admin from '../../../entities/Admin';
import { ILoginAdminRepository } from '../../interfaces';

export class LoginAdminDynamoRepository implements ILoginAdminRepository {
    private dynamoClientDB: DocumentClient;

    constructor() {
        this.dynamoClientDB = new DynamoDB.DocumentClient();
    }

    public async getAdminInfoByEmail(email: string): Promise<Admin | AWSError> {
        const queryAdminParams: QueryInput = {
            TableName: process.env.ADMINS_TABLE_NAME,
            KeyConditionExpression: '#email = :email',
            ExpressionAttributeNames: {
                '#email': 'email',
            },
            ExpressionAttributeValues: {
                ':email': email as AttributeValue,
            },
        };

        const getAdminInfo: QueryOutput | AWSError = await this.dynamoClientDB
            .query(queryAdminParams)
            .promise();

        return getAdminInfo.Items[0];
    }
}
