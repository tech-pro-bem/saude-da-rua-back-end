import { APIGatewayProxyResult } from 'aws-lambda';
import { refreshLongLivedTokenUseCase } from '../../../modules/auth/useCases/refreshLongLivedToken';

const handler = async (event, context): Promise<void> => {
    await refreshLongLivedTokenUseCase.execute();
};

export const main = handler;
