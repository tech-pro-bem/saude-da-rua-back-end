import {
    APIGatewayProxyEventV2WithRequestContext,
    APIGatewayProxyResult,
} from 'aws-lambda';
import loginAdminUseCase from '../useCases/loginAdmin';

interface IParsedBodyAfterPassLambdProxy {
    email: string;

    password: string;
}

// interface IPayloadLoginValidation {}

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

    const parsedBody: IParsedBodyAfterPassLambdProxy = JSON.parse(
        event.requestContext.authorizer.lambda
    );

    try {
        // Fazer validação
        const loginValidation = new LoginValidation(parsedBody);

        const loginPayloadValidation = await loginValidation.validation();

        const token = await loginAdminUseCase.execute(loginPayloadValidation);

        response.body = JSON.stringify({
            mainMessage: 'Sucessfully Log in',
            token,
            data: 'Retorno dos dados',
        });
    } catch (error) {
        if (error.message === '400') {
            response.statusCode = 400;

            response.body = JSON.stringify({
                mainMessage: 'Failed to Log in',
                errorMessage: 'Incorrect body',
            });
        } else {
            response.statusCode = 500;

            response.body = JSON.stringify({
                mainMessage: 'Failed to Log in',
                errorMessage:
                    'There is an error on our servers, please try again later',
            });
        }
    }

    return response;
};
