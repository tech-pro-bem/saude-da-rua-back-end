import { formatJSONResponse, APIEventBodySchema, middyfy } from '../middyfy';
import { getAuthenticatedAdminUseCase } from '../../../modules/admins/useCases/getAuthenticatedAdmin';

const handle = async (event: APIEventBodySchema) => {
    const { adminEmail } = event.requestContext.authorizer.lambda;
    const admin = await getAuthenticatedAdminUseCase.execute({
        email: adminEmail,
    });

    return formatJSONResponse(admin, 200);
};

export const main = middyfy(handle);
