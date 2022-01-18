import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import createAdminUseCase from '../useCases/createAdmin';

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

    const parsedBody = JSON.parse(event.body);

    try {
        await createAdminUseCase.execute(parsedBody);

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
