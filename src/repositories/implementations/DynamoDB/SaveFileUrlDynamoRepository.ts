import {
    DocumentClient,
    PutItemInput,
    PutItemOutput,
    PutItemInputAttributeMap,
} from 'aws-sdk/clients/dynamodb';
import { ISaveFileUrlRepository } from '../../interfaces';
import { DynamoDocumentClientCredentials } from '../../../helpers/database/DynamoDocumentClient';
import { File } from '../../../entities/File';
import { AWSError } from 'aws-sdk';
import { InternalServerError } from '../../../helpers/errors';

export class SaveFileUrlDynamoRepository
    extends DynamoDocumentClientCredentials
    implements ISaveFileUrlRepository
{
    private dynamoClientDB: DocumentClient;

    private filesTableName = process.env.FILES_TABLE_NAME;

    constructor() {
        super();
        this.dynamoClientDB = super.getDynamoClient();
    }

    public async saveFileData(file: File): Promise<string | InternalServerError> {
        const saveFilesUrlParams: PutItemInput = {
            TableName: this.filesTableName,
            Item: file as unknown as PutItemInputAttributeMap,
        };

        const outputFromDynamo: PutItemOutput | AWSError = 
             await this.dynamoClientDB.put(saveFilesUrlParams).promise();

        if(outputFromDynamo instanceof Error) {
            throw new InternalServerError('There was an error trying to save the information to our database');
        }

        return file.fileUrl;
    }
}
