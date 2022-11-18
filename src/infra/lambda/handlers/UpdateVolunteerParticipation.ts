import { APIGatewayProxyResult } from 'aws-lambda';
import { UpdateVolunteerParticipationValidation } from '../../../utils/validations/volunteerValidations/UpdateVolunteerParticipationValidation';
import { updateVolunteerParticipationUseCase } from '../../../modules/volunteers/useCases/updateVolunteerParticipation';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const { id } = event.pathParameters;
    const parsedBody = event.body;

    const updateVolunteerParticipationValidation =
        new UpdateVolunteerParticipationValidation({ id, ...parsedBody });

    const updateVolunteerParticipationPayload =
        await updateVolunteerParticipationValidation.validateInput();

    await updateVolunteerParticipationUseCase.execute(
        updateVolunteerParticipationPayload
    );

    return formatJSONResponse(undefined, 204);
};

export const main = middyfy(handler);
