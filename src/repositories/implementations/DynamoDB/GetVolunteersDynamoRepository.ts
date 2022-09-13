import {
    DocumentClient,
    Key,
    ScanInput,
    ScanOutput,
} from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk';
import { Volunteer } from '../../../entities/Volunteer';
import {
    IGetVolunteersRepository,
    RequestGetVolunteers,
    ResponseGetVolunteers,
} from '../../interfaces';
import { DynamoDocumentClientCredentials } from '../../../helpers/database/DynamoDocumentClient';

interface TlastEvaluatedParsed {
    id: string;
}

export class GetVolunteersDynamoRepository
    extends DynamoDocumentClientCredentials
    implements IGetVolunteersRepository
{
    private dynamoClientDB: DocumentClient;

    constructor() {
        super();
        this.dynamoClientDB = super.getDynamoClient();
    }

    public async getVolunteers({
        offset,
        limit,
        lastVolunteerId,
    }: RequestGetVolunteers): Promise<ResponseGetVolunteers> {
        const offsetParsed = {
            email: lastVolunteerId,
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

        const content: ResponseGetVolunteers = {
            id: lastEvaluatedParsed,
            volunteers: volunteersList,
        };

        return content;
    }
}
