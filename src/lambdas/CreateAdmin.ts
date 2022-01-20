import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import createAdminUseCase from '../useCases/createAdmin';

import CreateAdminValidation from '../utils/validations/CreateAdminValidation';

interface IParsedfromEventBody {
    [name: string]: any;
}

interface IPayloadValidation {
    email: string;

    name: string;

    password: string;
}

export const handler = async (
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

    const parsedBody: IParsedfromEventBody = JSON.parse(event.body);

    try {
        const createAdminValidation = new CreateAdminValidation(parsedBody);

        const payloadValidation: IPayloadValidation =
            await createAdminValidation.validateInput();

        await createAdminUseCase.execute(payloadValidation);

        response.body = JSON.stringify({
            message: 'Successfully create Admin account',
        });
    } catch (error) {
        if (error.message === '400') {
            response.statusCode = 400;

            response.body = JSON.stringify({
                mainMessage: 'Failed to create Admin account',

                errorMessage: 'Incorrect body',
            });
        } else {
            response.statusCode = 500;

            response.body = JSON.stringify({
                mainMessage: 'Failed to create Admin account',

                errorMessage:
                    'There is an error on our servers, please try again laters',
            });
        }
    }

    return response;
};
