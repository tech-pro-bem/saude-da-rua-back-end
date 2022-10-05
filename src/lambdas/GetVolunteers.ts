import {
    APIGatewayProxyEventV2WithRequestContext,
    APIGatewayProxyResult,
} from 'aws-lambda';
import getVolunteersUseCase from '../useCases/getVolunteers';
import { GetVolunteersValidation } from '../utils/validations/volunteerValidations';

type TParsedFromEventQueryString = {
    [name: string]: string;
};

type TQueryStringParameters = {
    lastVolunteerId: string | null;
    limit: number;
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

    const parsedQueryString: TParsedFromEventQueryString =
        event.queryStringParameters;

    try {
        const getVolunteersValidation = new GetVolunteersValidation(
            parsedQueryString
        );

        const getVolunteersPayloadValidated: TQueryStringParameters =
            await getVolunteersValidation.validateInput();

        const volunteersListAndLastValueted =
            await getVolunteersUseCase.execute(getVolunteersPayloadValidated);

        response.body = JSON.stringify(volunteersListAndLastValueted);
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
