import { APIGatewayProxyResult } from 'aws-lambda';
import getInstagramTokenUseCase from '../../../modules/volunteers/useCases/getInstagramToken';
import { formatJSONResponse, middyfy } from '../middyfy';

const handler = async (): Promise<APIGatewayProxyResult> => {
    const instagramTokenResponse = getInstagramTokenUseCase.execute();

    return formatJSONResponse(instagramTokenResponse);
};

export const main = middyfy(handler);
