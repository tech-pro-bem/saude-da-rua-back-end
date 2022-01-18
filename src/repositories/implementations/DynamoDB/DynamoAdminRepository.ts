import { AWSError, DynamoDB } from 'aws-sdk';

import {
    DocumentClient,
    QueryInput,
    AttributeValue,
    QueryOutput,
} from 'aws-sdk/clients/dynamodb';

import Admin from '../../../entities/Admin';

import IAdminRepository from '../../interfaces/IAdminRepository';

class DynamoAdminRepository implements IAdminRepository {
    private dynamoClientDB: DocumentClient;

    constructor() {
        this.dynamoClientDB = new DynamoDB.DocumentClient();
    }

    public async findByEmail(email: string): Promise<boolean> {
        const queryAdminParams: QueryInput = {
            TableName: process.env.DYNAMO_USER_TABLE,

            KeyConditionExpression: '#email = :email',

            ExpressionAttributeNames: {
                '#email': 'pk',
            },

            ExpressionAttributeValues: {
                ':username': email as AttributeValue,
            },
        };

        const checkInDynamoIfExists: QueryOutput | AWSError =
            await this.dynamoClientDB.query(queryAdminParams).promise();

        if (checkInDynamoIfExists.Count === 1) {
            return true;
        }

        return false;
    }

    public async saveAdmin(admin: Admin): Promise<boolean> {
        const checkInDynamoWasSaved;

        return true;
    }
}

export default DynamoAdminRepository;
