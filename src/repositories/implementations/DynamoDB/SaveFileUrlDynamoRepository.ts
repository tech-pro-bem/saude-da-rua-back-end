import {
    DocumentClient,
    PutItemInput,
    PutItemInputAttributeMap,
} from 'aws-sdk/clients/dynamodb';
import { ISaveFileUrlRepository } from '../../interfaces';
import { DynamoDocumentClientCredentials } from '../../../helpers/database/DynamoDocumentClient';
import { FileType } from '../../../entities/File';

export class SaveFileUrlDynamoRepository
    extends DynamoDocumentClientCredentials
    implements ISaveFileUrlRepository
{
    private dynamoClientDB: DocumentClient;

    private urlBase = `https://${process.env.FILE_BUCKET_NAME}.s3-${process.env.region}.amazonaws.com/`;

    constructor() {
        super();
        this.dynamoClientDB = super.getDynamoClient();
    }

    public async saveUrl(fileId: string, fileType: FileType): Promise<void> {
        let tableName: string;

        this.urlBase += fileId;

        if (fileType === FileType.IMAGE) {
            tableName = process.env.IMAGES_URLS_TABLE_NAME;
        } else {
            tableName = process.env.PDFS_URLS_TABLE_NAME;
        }

        const saveFilesUrlParams: PutItemInput = {
            TableName: tableName,
            Item: this.urlBase as unknown as PutItemInputAttributeMap,
        };

        await this.dynamoClientDB.put(saveFilesUrlParams).promise();
    }
}
