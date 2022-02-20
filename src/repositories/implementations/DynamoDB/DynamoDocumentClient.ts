import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export class DynamoDocumentClient {
    private prodDynamoClient: DocumentClient = new DynamoDB.DocumentClient();

    private devDynamoClient: DocumentClient = new DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    });

    private jestDynamoClient: DocumentClient = new DynamoDB.DocumentClient({
        region: 'local-env',
        endpoint: 'http://localhost:8000',
        sslEnabled: false,
    });

    get getProdClient() {
        return this.getProdClient;
    }

    get getDevClient() {
        return this.devDynamoClient;
    }

    get getJestClient() {
        return this.jestDynamoClient;
    }
}
