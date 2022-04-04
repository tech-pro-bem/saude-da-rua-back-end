import {
    APIGatewayProxyEventV2WithRequestContext,
    APIGatewayProxyResult,
} from 'aws-lambda';
import verifyVolunteerEmailUseCase from '../useCases/verifyVolunteerEmail';
import { VerifyVolunteerEmailValidation } from '../utils/validations/volunteerValidations/VerifyVolunteerEmailValidation';

type TParsedFromEventQueryString = {
    [name: string]: string;
};

type TJwtQueryStringParameter = {
    token: string;
};

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

    const jwtFromVolunteerEmail: TParsedFromEventQueryString =
        event.queryStringParameters;

    try {
        const verifyVolunteerEmailValidation =
            new VerifyVolunteerEmailValidation(jwtFromVolunteerEmail);

        const verifyVolunteerEmailPayloadValidated: TJwtQueryStringParameter =
            await verifyVolunteerEmailValidation.validateInput();

        await verifyVolunteerEmailUseCase.execute(
            verifyVolunteerEmailPayloadValidated
        );
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
