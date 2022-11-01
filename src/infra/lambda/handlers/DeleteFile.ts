import { APIGatewayProxyResult } from 'aws-lambda';
import { deleteFileUseCase } from '../../../modules/files/useCases/deleteFile';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const fileId = event.pathParameters?.fileId || '';
    await deleteFileUseCase.execute({
        fileId,
    });

    return formatJSONResponse(undefined, 204);
};

export const main = middyfy(handler);
