import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export class DynamoDocumentClientCredentials {
    private devClientCredentials = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };

    private jestClientCredentials = {
        region: 'local-env',
        endpoint: 'http://localhost:8000',
        sslEnabled: false,
    };

    public getDynamoClient(): DocumentClient {
        switch (process.env.IS_PRODUCTION) {
            case 'true':
                return new DynamoDB.DocumentClient();
            case 'false':
                return new DynamoDB.DocumentClient(this.devClientCredentials);
            default:
                return new DynamoDB.DocumentClient(this.jestClientCredentials);
        }
    }
}
