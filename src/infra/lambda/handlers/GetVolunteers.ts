import { APIGatewayProxyResult } from 'aws-lambda';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';
import { getVolunteersUseCase } from '../../../modules/volunteers/useCases/getVolunteers';
import { GetVolunteersValidation } from '../../../utils/validations/volunteerValidations';

type QueryStringParameters = {
    lastVolunteerId: string | null;
    limit: number;
};

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const parsedQueryString = event.queryStringParameters;

    const getVolunteersValidation = new GetVolunteersValidation(
        parsedQueryString
    );

    const getVolunteersPayloadValidated: QueryStringParameters =
        await getVolunteersValidation.validateInput();

    const volunteersListAndLastValueted = await getVolunteersUseCase.execute(
        getVolunteersPayloadValidated
    );

    return formatJSONResponse(volunteersListAndLastValueted);
};

export const main = middyfy(handler);
