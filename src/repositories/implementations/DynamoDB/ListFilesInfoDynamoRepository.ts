import {
    DocumentClient, QueryInput, AttributeValue, QueryOutput
} from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk';
import { DynamoDocumentClientCredentials } from '../../../helpers/database/DynamoDocumentClient';
import { IListFilesInfoRepository } from '../../interfaces';
import { FileType, File } from '../../../entities/File';
import { NotFoundError, UnknownError } from '../../../helpers/errors'

export class ListFilesInfoDynamoRepository
    extends DynamoDocumentClientCredentials 
    implements IListFilesInfoRepository {
    
    private dynamoClientDB: DocumentClient;

    constructor() {
        super();
        this.dynamoClientDB = super.getDynamoClient();
    }

    public async listFiles(fileType: FileType): Promise<Array<File>> {
        const listFilesParams: QueryInput = {
            TableName: process.env.FILE_TABLE_NAME,
            KeyConditionExpression: '#fileType = :fileType',
            ExpressionAttributeNames: {
                '#fileType': 'fileType',
            },
            ExpressionAttributeValues: {
                ':fileType': fileType as AttributeValue,
            },
        }

        const listFiles: QueryOutput | AWSError = 
            await this.dynamoClientDB.query(listFilesParams).promise();

        if(listFiles.Count === 0) {
            throw new NotFoundError('There is no Files to retrieve');
        } else if (listFiles instanceof Error) {
            throw new UnknownError();
        }

        return listFiles.Items.map((item) => {
            return new File(
                item.fileType as FileType,
                item.url as string,
                item.fileId as string,
                item.createdAt as number
            );
        });
    }
}