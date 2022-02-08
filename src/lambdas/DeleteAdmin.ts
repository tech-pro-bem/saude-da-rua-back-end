/* eslint-disable no-unused-vars */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import createAdminUseCase from '../useCases/createAdmin';

import CreateAdminValidation from '../utils/validations/CreateAdminValidation';

interface IParsedfromEventBody {
    [name: string]: any;
}

interface IPayloadCreateAdminValidation {
    email: string;
}

export const handler = async (
    // Aqui passa pelo lambda auth, então mudar
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const response: APIGatewayProxyResult = {
        isBase64Encoded: false,
        statusCode: 201,
        body: '',
        headers: {
            'content-type': 'application/json',
        },
    };
    console.log(event);
    const parsedBody: IParsedfromEventBody = JSON.parse(event.body);
    return response;
};
