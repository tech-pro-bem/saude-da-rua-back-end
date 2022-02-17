import {
    APIGatewayProxyEventV2WithRequestContext,
    APIGatewayProxyResult,
} from 'aws-lambda';
import loginAdminUseCase from '../useCases/loginAdmin';
import { LoginAdminValidation } from '../utils/validations';

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
        response.statusCode = error.code;
        response.body = JSON.stringify({
            errorClassName: error.name,
            generalErrorMessage: error.generalErrorMessage,
            mainErrorMessage: error.mainErrorMessage,
        });
    }

    return response;
};
