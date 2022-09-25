import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { FileType } from '../entities/File';
import ListFilesUseCase from '../useCases/listFile';
import { constEnumType } from '../utils/ConstEnumType';

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const response: APIGatewayProxyResult = {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {
            'content-type': 'application/json',
        },
        body: '',
    };

    try {
        const fileType = event.pathParameters?.fileType || '';
        const files = await ListFilesUseCase.execute({
            lastFileId: event.queryStringParameters?.lastFileId,
            limit: Number(event.queryStringParameters?.limit || 1),
            type: fileType as constEnumType<typeof FileType>,
        });

        response.body = JSON.stringify(files);
    } catch (error) {
        response.statusCode = error.code;
        response.body = JSON.stringify({});
    }

    return response;
};
