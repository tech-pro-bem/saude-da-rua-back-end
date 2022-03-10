import { config } from 'dotenv';
import { APIGatewayProxyResult } from 'aws-lambda';
import { handler } from '../../src/lambdas/CreateAdmin';
import { EventGeneratorFromGatewayV2, isApiGatewayResponse } from '../helpers';

config({ path: '.env.test' });

describe('integration tests: create admin', () => {
    test('it should take a body and return an API Gateway response', async () => {
        const data = {
            email: 'testvalidresponse@gmail.com',
            name: 'Valid Response',
            password: 'integrationtest',
        };
        const eventGenerator = new EventGeneratorFromGatewayV2(data);

        const fullEvent = eventGenerator.getFullEvent;

        const response: APIGatewayProxyResult = await handler(fullEvent);

        expect(response).toBeDefined();
        expect(isApiGatewayResponse(response)).toBe(true);
    });

    test('it should return a 201 with sucessfully message', async () => {
        const data = {
            email: 'createadminint_test@gmail.com',
            name: 'Create Admin',
            password: 'integrationtest',
        };
        const eventGenerator = new EventGeneratorFromGatewayV2(data);

        const fullEvent = eventGenerator.getFullEvent;

        const response: APIGatewayProxyResult = await handler(fullEvent);

        const bodyResponse = JSON.parse(response.body);

        expect(response.isBase64Encoded).toBeFalsy();
        expect(response.statusCode).toBe(201);
        expect(bodyResponse).toEqual({
            message: 'Successfully create Admin account',
        });
    });
});
