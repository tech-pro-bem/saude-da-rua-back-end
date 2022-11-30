import { APIGatewayProxyResult } from 'aws-lambda';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';
import { getVolunteersUseCase } from '../../../modules/volunteers/useCases/getVolunteers';
import { GetVolunteersValidation } from '../../../utils/validations/volunteerValidations';

type QueryStringParameters = {
    page: number | null;
    limit: number;
    searchTerm?: string
};
// TODO: search por email, nome, profissão, isCurrentlyParticipating asc desc
const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    event.queryStringParameters.limit =
        event.queryStringParameters.limit || '20';

    const parsedQueryString = event.queryStringParameters;

    const getVolunteersValidation = new GetVolunteersValidation(
        parsedQueryString
    );

    const getVolunteersPayloadValidated: QueryStringParameters =
        await getVolunteersValidation.validateInput();

    const [count, volunteersListAndLastValueted] = await getVolunteersUseCase.execute(
        getVolunteersPayloadValidated
    );
    const headers = {
        'X-Total-Count': String(count)
    }
    return formatJSONResponse(volunteersListAndLastValueted, 200, headers);
};

export const main = middyfy(handler);
