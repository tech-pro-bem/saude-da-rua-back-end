import { AWSError } from "aws-sdk";
import {
    AttributeValue,
    DocumentClient,
    DeleteItemInput,
    DeleteItemOutput,
} from 'aws-sdk/clients/dynamodb';
import { DynamoDocumentClientCredentials } from "../../../helpers/database/DynamoDocumentClient";
import { IDeleteFileInfoDynamoRepository } from "../../interfaces/IDeleteFileInfoDynamoRepository";
import { InternalServerError } from '../../../helpers/errors'

export class DeleteFileInfoDynamoRepository 
    extends DynamoDocumentClientCredentials 
    implements IDeleteFileInfoDynamoRepository
    {
        private dynamoClientDB: DocumentClient;

        private readonly filesTableName = process.env.FILES_TABLE_NAME;

        constructor() {
            super();
            this.dynamoClientDB = super.getDynamoClient();
        }

        public async deleteFileInfo(fileId: string): Promise<void | Error> {
            const deteleFileParams: DeleteItemInput = {
                TableName: this.filesTableName,
                Key: {
                    fileId: fileId as AttributeValue
                },
            };

            const resultFromDynamo: DeleteItemOutput | AWSError = 
                await this.dynamoClientDB.delete(deteleFileParams).promise();

            if(resultFromDynamo instanceof Error) {
                throw new InternalServerError('There was an error trying to delete the file in our database');
            }
        }
}