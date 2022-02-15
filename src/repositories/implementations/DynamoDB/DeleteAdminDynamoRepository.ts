/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { AWSError, DynamoDB } from 'aws-sdk';
import {
    AttributeValue,
    DocumentClient,
    QueryInput,
    QueryOutput,
    DeleteItemInput,
} from 'aws-sdk/clients/dynamodb';
import Admin from '../../../entities/Admin';
import IDeleteAdminRepository from '../../interfaces/IDeleteAdminRepository';

class DeleteAdminDynamoRepository implements IDeleteAdminRepository {
    private dynamoClientDB: DocumentClient;

    constructor() {
        this.dynamoClientDB = new DynamoDB.DocumentClient();
    }

    public async FindByEmailAsync(email: string): Promise<boolean> {
        const queryAdminParams: QueryInput = {
            TableName: process.env.ADMINS_TABLE_NAME,
            KeyConditionExpression: '#email = :email',
            ExpressionAttributeNames: {
                '#email': 'pk',
            },
            ExpressionAttributeValues: {
                ':email': email as AttributeValue,
            },
        };

        const checkInDynamoIfExists: QueryOutput | AWSError =
            await this.dynamoClientDB.query(queryAdminParams).promise();

        if (checkInDynamoIfExists.Count === 1) {
            return true;
        }

        return false;
    }

    // realizo o delete aqui importante ******
    public async deleteAdmin(email: string): Promise<boolean> {
        const DeleteAdminParams: DynamoDB.Delete = {
            TableName: process.env.ADMINS_TABLE_NAME,
            Key: {
                email: email as AttributeValue,
            },
        };

        await this.dynamoClientDB.delete(DeleteAdminParams).promise();

        return true;
    }
}

export default DeleteAdminDynamoRepository;
