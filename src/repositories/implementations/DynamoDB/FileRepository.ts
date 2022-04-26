import { AWSError } from 'aws-sdk';
import {
    DocumentClient,
    QueryInput,
    AttributeValue,
    QueryOutput,
    PutItemInput,
    PutItemInputAttributeMap,
} from 'aws-sdk/clients/dynamodb';
import { DynamoDocumentClientCredentials } from '../../../helpers/database/DynamoDocumentClient';
import { ICreateFileRepository, IDeleteFileRepository, IListFileRepository, ListFilesParams } from '../../interfaces';
import { File, FileType } from '../../../entities/File';

export class FileDynamoRepository
    extends DynamoDocumentClientCredentials
    implements ICreateFileRepository, IDeleteFileRepository, IListFileRepository
{
    private dynamoClientDB: DocumentClient;

    constructor() {
        super();
        this.dynamoClientDB = super.getDynamoClient();
    }

    public async createFile(file: File): Promise<void> {

        const newFileParamsToPut: PutItemInput = {
            TableName: process.env.FILE_TABLE_NAME,
            Item: {
                "fileId": file.fileId,
                "fileType": file.fileType,
                "createdAt": file.createdAt,
                "url": file.url,
                
            } as  PutItemInputAttributeMap
        };
        await this.dynamoClientDB.put(newFileParamsToPut).promise();
    }

    public async deleteFile(fileId: string): Promise<void> {
        const deleteFileParams: QueryInput = {
            TableName: process.env.FILE_TABLE_NAME,
            KeyConditionExpression: '#fileId = :fileId',
            ExpressionAttributeNames: {
                '#fileId': 'fileId',
            },
            ExpressionAttributeValues: {
                ':fileId': fileId as AttributeValue,
            },
            
        };

        const deleteFile: QueryOutput | AWSError =
            await this.dynamoClientDB.query(deleteFileParams).promise();
        await Promise.all(deleteFile.Items.map(async (item) => {
            const deleteFileParams = {
                TableName: process.env.FILE_TABLE_NAME,
                Key: {
                    fileId: item.fileId,
                    FileType: item.fileType,
                }
            };

            await this.dynamoClientDB.delete(deleteFileParams).promise();
        }))
    
    }

    public async listFiles(params: ListFilesParams): Promise<File[]> {
        const listFilesParams: QueryInput = {
            TableName: process.env.FILE_TABLE_NAME,
            KeyConditionExpression: '#fileType = :fileType',
            ExpressionAttributeNames: {
                '#fileType': 'fileType',
            },
            ExpressionAttributeValues: {
                ':fileType': params.type as AttributeValue,
            },
            
        };

        const listFiles: QueryOutput | AWSError =
            await this.dynamoClientDB.query(listFilesParams).promise();

        if (listFiles.Count === 0) {
            return [];
        }
        return listFiles.Items.map((item) => {
            return new File(
                item.fileId as string,
                item.fileType as FileType,
                item.url as string,
                item.createdAt as number
            );
        })
    }
}
