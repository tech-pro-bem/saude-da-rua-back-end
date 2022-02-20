import { AWSError } from 'aws-sdk';
import {
    DocumentClient,
    QueryInput,
    AttributeValue,
    QueryOutput,
    PutItemInput,
    PutItemInputAttributeMap,
} from 'aws-sdk/clients/dynamodb';
import Admin from '../../../entities/Admin';
import { ICreateAdminRepository } from '../../interfaces';
import { DynamoDocumentClientCredentials } from '../../../helpers/database/DynamoDocumentClient';

export class CreateAdminDynamoRepository
    extends DynamoDocumentClientCredentials
    implements ICreateAdminRepository
{
    private dynamoClientDB: DocumentClient;

    constructor() {
        super();
        this.dynamoClientDB = super.getDynamoClient();
    }

    public async checkIfAdminExistsByEmail(email: string): Promise<boolean> {
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

        const checkInDynamoIfExists: QueryOutput | AWSError =
            await this.dynamoClientDB.query(queryAdminParams).promise();

        if (checkInDynamoIfExists.Count === 1) {
            return true;
        }

        return false;
    }

    public async saveAdmin(admin: Admin): Promise<boolean> {
        const newAdminParamsToPut: PutItemInput = {
            TableName: process.env.ADMINS_TABLE_NAME,
            Item: admin as PutItemInputAttributeMap,
        };

        await this.dynamoClientDB.put(newAdminParamsToPut).promise();

        return true;
    }
}
