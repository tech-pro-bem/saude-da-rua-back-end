import { APIGatewayProxyResult } from 'aws-lambda';
import { deleteAdminUseCase } from '../../../modules/admins/useCases/deleteAdmin';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters?.id || '';
    await deleteAdminUseCase.execute({
        id,
    });

    return formatJSONResponse(undefined, 204);
};

export const main = middyfy(handler);
