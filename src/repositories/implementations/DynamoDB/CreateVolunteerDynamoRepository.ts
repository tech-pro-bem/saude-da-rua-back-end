import { AWSError } from 'aws-sdk';
import {
    DocumentClient,
    QueryInput,
    AttributeValue,
    QueryOutput,
    PutItemInput,
    PutItemInputAttributeMap,
} from 'aws-sdk/clients/dynamodb';
import { Volunteer } from '../../../entities/Volunteer';
import { ICreateVolunteerRepository } from '../../interfaces';
import { DynamoDocumentClientCredentials } from '../../../helpers/database/DynamoDocumentClient';

export class CreateVolunteerDynamoRepository
    extends DynamoDocumentClientCredentials
    implements ICreateVolunteerRepository
{
    private dynamoClientDB: DocumentClient;

    constructor() {
        super();
        this.dynamoClientDB = super.getDynamoClient();
    }

    public async checkIfVolunteerExistsByEmail(
        email: string
    ): Promise<boolean> {
        const queryVolunteerParams: QueryInput = {
            TableName: process.env.VOLUNTEERS_TABLE_NAME,
            KeyConditionExpression: '#email = :email',
            ExpressionAttributeNames: {
                '#email': 'email',
            },
            ExpressionAttributeValues: {
                ':email': email as AttributeValue,
            },
        };

        const checkInDynamoIfExists: QueryOutput | AWSError =
            await this.dynamoClientDB.query(queryVolunteerParams).promise();

        if (checkInDynamoIfExists.Count === 1) {
            return true;
        }

        return false;
    }

    public async saveVolunteer(volunteer: Volunteer): Promise<boolean> {
        const newVolunteerParamsToPut: PutItemInput = {
            TableName: process.env.VOLUNTEERS_TABLE_NAME,
            Item: volunteer as unknown as PutItemInputAttributeMap,
        };

        await this.dynamoClientDB.put(newVolunteerParamsToPut).promise();

        return true;
    }
}
