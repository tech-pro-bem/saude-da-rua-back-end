import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import GetAuthenticatedAdminUseCase from '../useCases/getAuthenticatedAdmin';

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const response: APIGatewayProxyResult = {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {
            'content-type': 'application/json',
        },
        body: '',
    };

    const { adminEmail } = event.requestContext.authorizer as { adminEmail: string };

    try {
        const admin = await GetAuthenticatedAdminUseCase.execute({ email: adminEmail});

        response.body = JSON.stringify(admin);
    } catch (error) {
        console.log(error);

        response.statusCode = error.code;
        response.body = JSON.stringify({
            errorClassName: error.name,
            generalErrorMessage: error.generalErrorMessage,
            mainErrorMessage: error.mainErrorMessage,
        });
    }

    return response;
};
