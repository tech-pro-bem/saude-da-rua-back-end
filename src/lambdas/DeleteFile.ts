import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import DeleFileUseCase from '../useCases/deleteFile';

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const response: APIGatewayProxyResult = {
        isBase64Encoded: false,
        statusCode: 204,
        headers: {
            'content-type': 'application/json',
        },
        body: '',
    };

    try {
        const fileType = event.pathParameters?.fileType || "";
        const fileId = event.pathParameters?.fileId || "";
        await  DeleFileUseCase.execute({
            fileId: `${fileType}#${fileId}`,
        });

    } catch (error) {
        response.statusCode = error.code;
        response.body = JSON.stringify({});
    }

    return response;
};
