import {
    APIGatewayProxyEventV2WithRequestContext,
    APIGatewayProxyResult,
} from 'aws-lambda';
import getInstagramTokenUseCase from '../useCases/getInstagramToken';


export const handler = async (): Promise<APIGatewayProxyResult> => {
    const response: APIGatewayProxyResult = {
        isBase64Encoded: false,
        statusCode: 200,
        body: '',
        headers: {
            'content-type': 'application/json',
        },
    };
    try {
        const instagramTokenResponse = await getInstagramTokenUseCase.execute();

        response.body = JSON.stringify(instagramTokenResponse);
    } catch (error) {
        response.statusCode = error.code;
        response.body = JSON.stringify({
            errorClassName: error.name,
            generalErrorMessage: error.generalErrorMessage,
            mainErrorMessage: error.mainErrorMessage,
        });
    }

    return response;
};
