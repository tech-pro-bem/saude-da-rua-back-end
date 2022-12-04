import { APIGatewayProxyResult } from 'aws-lambda';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';
import { getMedicineUseCase } from '../../../modules/medicines/useCases/getMedicine';

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters?.id || '';

    const medicine = await getMedicineUseCase.execute({ id });

    return formatJSONResponse(medicine);
};

export const main = middyfy(handler);
