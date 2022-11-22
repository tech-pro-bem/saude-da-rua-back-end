import { APIGatewayProxyResult } from 'aws-lambda';
import { UpdateCurrentlyParticipationValidation } from '../../../utils/validations/volunteerValidations/UpdateCurrentlyParticipationValidation';
import { updateCurrentlyParticipationUseCase } from '../../../modules/volunteers/useCases/updateCurrentlyParticipation';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const { id } = event.pathParameters;
    const parsedBody = event.body;

    const updateCurrentlyParticipationValidation =
        new UpdateCurrentlyParticipationValidation({ id, ...parsedBody });

    const updateCurrentlyParticipationPayload =
        await updateCurrentlyParticipationValidation.validateInput();

    await updateCurrentlyParticipationUseCase.execute(
        updateCurrentlyParticipationPayload
    );

    return formatJSONResponse(undefined, 204);
};

export const main = middyfy(handler);
