import { AWSError, DynamoDB } from 'aws-sdk';
import {
    DocumentClient,
    QueryInput,
    AttributeValue,
    QueryOutput,
} from 'aws-sdk/clients/dynamodb';
import Admin from '../../../entities/Admin';
import ILoginAdminRepository from '../../interfaces/ILoginAdminRepository';

class LoginAdminDynamoRepository implements ILoginAdminRepository {
    private dynamoClientDB: DocumentClient;

    constructor() {
        this.dynamoClientDB = new DynamoDB.DocumentClient();
    }

    public async findByEmail(email: string): Promise<Admin | AWSError> {
        const queryAdminParams: QueryInput = {
            TableName: process.env.DYNAMO_USER_TABLE,
            KeyConditionExpression: '#email = :email',
            ExpressionAttributeNames: {
                '#email': 'pk',
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

export default LoginAdminDynamoRepository;
