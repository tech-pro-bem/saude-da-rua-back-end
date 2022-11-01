import { APIGatewayProxyResult } from 'aws-lambda';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';
import { getOneVolunteerUseCase } from '../../../modules/volunteers/useCases/getOneVolunteer';
import { GetOneVolunteerValidation } from '../../../utils/validations/volunteerValidations';

type QueryStringParameters = {
    email: string;
};

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const parsedQueryString = event.queryStringParameters;

    const getOneVolunteerValidation = new GetOneVolunteerValidation(
        parsedQueryString
    );

    const getOneVolunteerPayloadValidated: QueryStringParameters =
        await getOneVolunteerValidation.validateInput();

    const volunteer = await getOneVolunteerUseCase.execute(
        getOneVolunteerPayloadValidated
    );

    return formatJSONResponse(volunteer);
};

export const main = middyfy(handler);
