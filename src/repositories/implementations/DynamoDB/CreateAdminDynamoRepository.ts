import { AWSError, DynamoDB } from 'aws-sdk';
import {
    DocumentClient,
    QueryInput,
    AttributeValue,
    QueryOutput,
    PutItemInput,
    PutItemInputAttributeMap,
} from 'aws-sdk/clients/dynamodb';
import Admin from '../../../entities/Admin';
import ICreateAdminRepository from '../../interfaces/ICreateAdminRepository';

class CreateAdminDynamoRepository implements ICreateAdminRepository {
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

    public async saveAdmin(admin: Admin): Promise<boolean> {
        // Se não funcionar, usa o marshal()
        const newAdminParamsToPut: PutItemInput = {
            TableName: process.env.DYNAMODB_ADMIN_TABLE,
            Item: admin as PutItemInputAttributeMap,
        };

        // Testar o comportamento lançando um erro
        await this.dynamoClientDB.put(newAdminParamsToPut).promise();

        return true;
    }
}

export default CreateAdminDynamoRepository;
