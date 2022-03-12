import {
    APIGatewayProxyEventV2WithRequestContext,
    APIGatewayProxyResult,
} from 'aws-lambda';
import getOneVolunteerUseCase from '../useCases/getOneVolunteer';
import { GetOneVolunteerValidation } from '../utils/validations/volunteerValidations';

type TParsedFromEventQueryString = {
    [name: string]: string;
};

type TQueryStringParameters = {
    email: string;
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
        const getOneVolunteerValidation = new GetOneVolunteerValidation(
            parsedQueryString
        );

        const getOneVolunteerPayloadValidated: TQueryStringParameters =
            await getOneVolunteerValidation.validateInput();

        const volunteer = await getOneVolunteerUseCase.execute(
            getOneVolunteerPayloadValidated
        );

        response.body = JSON.stringify(volunteer);
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
