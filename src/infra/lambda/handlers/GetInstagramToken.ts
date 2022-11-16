import { APIGatewayProxyResult } from 'aws-lambda';
import { getInstagramTokenUseCase } from '../../../modules/auth/useCases/getInstagramToken';
import { formatJSONResponse, middyfy } from '../middyfy';

const handler = async (): Promise<APIGatewayProxyResult> => {
    const instagramTokenResponse = await getInstagramTokenUseCase.execute();

    return formatJSONResponse(instagramTokenResponse);
};

export const main = middyfy(handler);
