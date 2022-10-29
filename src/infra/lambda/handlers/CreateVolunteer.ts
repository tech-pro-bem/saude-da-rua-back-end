import { APIGatewayProxyResult } from 'aws-lambda';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';
import { CreateVolunteerValidation } from '../../../utils/validations/volunteerValidations';
import { VolunteerProps } from '../../../modules/volunteers/entities/Volunteer';
import { createVolunteerUseCase } from '../../../modules/volunteers/useCases/createVolunteer';

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const createVolunteerValidation = new CreateVolunteerValidation(event.body);

    const createVolunteerPayloadValidated: VolunteerProps =
        await createVolunteerValidation.validateInput();

    await createVolunteerUseCase.execute(createVolunteerPayloadValidated);

    await createVolunteerUseCase.publishNewVolunteer();

    return formatJSONResponse(
        {
            message: 'Successfully create volunteer',
        },
        201
    );
};

export const main = middyfy(handler);
