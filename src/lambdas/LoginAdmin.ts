import {
    APIGatewayProxyEventV2WithRequestContext,
    APIGatewayProxyResult,
} from 'aws-lambda';
import loginAdminUseCase from '../useCases/loginAdmin';
import LoginAdminValidation from '../utils/validations/LoginAdminValidation';

interface IParsedfromEventBody {
    [name: string]: any;
}

interface IPayloadLoginAdminValidation {
    email: string;

    password: string;
}

export const handler = async (
    event: APIGatewayProxyEventV2WithRequestContext<any>
): Promise<APIGatewayProxyResult> => {
    const response: APIGatewayProxyResult = {
        isBase64Encoded: false,
        statusCode: 200,
        body: '',
        headers: {
            'content-type': 'application/json',
        },
    };

    const parsedBody: IParsedfromEventBody = JSON.parse(event.body);

    try {
        const loginAdminvalidation = new LoginAdminValidation(parsedBody);

        const loginPayloadValidation: IPayloadLoginAdminValidation =
            await loginAdminvalidation.validateInput();

        const token = await loginAdminUseCase.execute(loginPayloadValidation);

        response.body = JSON.stringify({
            mainMessage: 'Sucessfully Log in',
            token,
        });
    } catch (error) {
        switch (error.message) {
            case '400':
                response.statusCode = 400;
                response.body = JSON.stringify({
                    mainMessage: 'Failed to create Admin account',
                    errorMessage: 'Incorrect body',
                });
                break;
            case '404':
                response.statusCode = 404;
                response.body = JSON.stringify({
                    mainMessage: 'Failed to Log in',
                    errorMessage: 'Email not founded',
                });
                break;
            default:
                response.statusCode = 500;
                response.body = JSON.stringify({
                    mainMessage: 'Failed to create Admin account',
                    errorMessage:
                        'There is an error on our servers, please try again later',
                });
        }
    }

    return response;
};
