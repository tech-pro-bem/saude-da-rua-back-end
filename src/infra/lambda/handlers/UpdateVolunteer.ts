import { APIGatewayProxyResult } from 'aws-lambda';
import { UpdateVolunteerValidation } from '../../../utils/validations/volunteerValidations/UpdateVolunteerValidation';
import { updateVolunteerUseCase } from '../../../modules/volunteers/useCases/updateVolunteer';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const { id } = event.pathParameters;
    const parsedBody = event.body;

    const updateVolunteerValidation = new UpdateVolunteerValidation(parsedBody);

    const updateVolunteerPayload =
        await updateVolunteerValidation.validateInput();

    await updateVolunteerUseCase.execute({
        id,
        ...updateVolunteerPayload,
    });

    return formatJSONResponse(undefined, 204);
};

export const main = middyfy(handler);
