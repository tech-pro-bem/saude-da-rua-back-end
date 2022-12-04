import { APIGatewayProxyResult } from 'aws-lambda';
import { deleteMedicineUseCase } from '../../../modules/medicines/useCases/deleteMedicine';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters?.id || '';

    await deleteMedicineUseCase.execute({
        id,
    });

    return formatJSONResponse(undefined, 204);
};

export const main = middyfy(handler);
