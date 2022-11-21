import { APIGatewayProxyResult } from 'aws-lambda';
import { getPixKeyUseCase } from '../../../modules/pix/useCases/getPixKey';
import { formatJSONResponse, middyfy } from '../middyfy';

const handler = async (): Promise<APIGatewayProxyResult> => {
    const pixKeyResponse = await getPixKeyUseCase.execute();

    return formatJSONResponse(pixKeyResponse);
};

export const main = middyfy(handler);
