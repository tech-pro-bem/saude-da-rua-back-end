import { APIGatewayProxyResult } from 'aws-lambda';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';
import { getVolunteersUseCase } from '../../../modules/volunteers/useCases/getVolunteers';
import { GetVolunteersValidation } from '../../../utils/validations/volunteerValidations';

type QueryStringParameters = {
    lastVolunteerId: string | null;
    limit: number;
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

    const volunteersListAndLastValueted = await getVolunteersUseCase.execute(
        getVolunteersPayloadValidated
    );

    // Sort from not currently participating volunteers to participating
    volunteersListAndLastValueted.sort(
        (last, next) => Number(last) - Number(next)
    );
    // Sort from oldest to newest
    volunteersListAndLastValueted.sort(
        (last, next) => last.createdAt.getTime() - next.createdAt.getTime()
    );

    return formatJSONResponse(volunteersListAndLastValueted);
};

export const main = middyfy(handler);
