import { APIGatewayProxyResult } from 'aws-lambda';
import { updateAdminPermissionLevelUseCase } from '../../../modules/admins/useCases/updatePermissionLevel';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters?.adminId || '';
    const permissionLevel = event.pathParameters?.permissionLevel || '';
    await updateAdminPermissionLevelUseCase.execute({
        id,
        permissionLevel
    });

    return formatJSONResponse(undefined, 204);
};

export const main = middyfy(handler);
