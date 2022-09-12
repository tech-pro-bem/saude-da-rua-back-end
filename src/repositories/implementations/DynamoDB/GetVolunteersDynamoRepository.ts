import {
    DocumentClient,
    Key,
    ScanInput,
    ScanOutput,
} from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk';
import { Volunteer } from '../../../entities/Volunteer';
import { IGetVolunteersRepository } from '../../interfaces';
import { DynamoDocumentClientCredentials } from '../../../helpers/database/DynamoDocumentClient';

type TlastEvaluatedParsed = {
    email: string;
};

export class GetVolunteersDynamoRepository
    extends DynamoDocumentClientCredentials
    implements IGetVolunteersRepository
{
    private dynamoClientDB: DocumentClient;

    constructor() {
        super();
        this.dynamoClientDB = super.getDynamoClient();
    }

    public async getVolunteers(
        offset: string | null,
        limit: number
    ): Promise<[TlastEvaluatedParsed, Volunteer[]]> {
        const offsetParsed = {
            email: offset,
        } as Key;

        const exclusiveStartKey = offset !== undefined ? offsetParsed : null;

        const queryVolunteersParams: ScanInput = {
            TableName: process.env.VOLUNTEERS_TABLE_NAME,
            Limit: limit,
            ProjectionExpression:
                'fullName, occupation, cellphoneNumberWithDDD, listFreeDaysOfWeek',
            ExclusiveStartKey: exclusiveStartKey,
        };

        const partOfVolunteers: ScanOutput | AWSError =
            await this.dynamoClientDB.scan(queryVolunteersParams).promise();

        const { Items, LastEvaluatedKey } = partOfVolunteers;

        const volunteersList = Items as unknown as Volunteer[];

        const lastEvaluatedParsed = LastEvaluatedKey as TlastEvaluatedParsed;

        return [lastEvaluatedParsed, volunteersList];
    }
}
