import {
    APIGatewayProxyEventV2WithRequestContext,
    APIGatewayProxyResult,
} from 'aws-lambda';
import createAdminUseCase from '../useCases/createAdmin';
import { CreateAdminValidation } from '../utils/validations';

interface IParsedfromEventBody {
    [name: string]: any;
}

interface IPayloadCreateAdminValidation {
    email: string;

    name: string;

    password: string;
}

export const handler = async (
    event: APIGatewayProxyEventV2WithRequestContext<any>
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

        const createAdminPayloadValidation: IPayloadCreateAdminValidation =
            await createAdminValidation.validateInput();

        await createAdminUseCase.execute(createAdminPayloadValidation);

        response.body = JSON.stringify({
            message: 'Successfully create Admin account',
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
