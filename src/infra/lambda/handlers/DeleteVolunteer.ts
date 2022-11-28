import { deleteVolunteerUseCase } from '../../../modules/volunteers/useCases/deleteVolunteer';
import { formatJSONResponse, APIEventBodySchema, middyfy } from '../middyfy';

const handle = async (event: APIEventBodySchema) => {
    const { id } = event.pathParameters;

    await deleteVolunteerUseCase.execute({ id });

    return formatJSONResponse(undefined, 204);
};

export const main = middyfy(handle);
