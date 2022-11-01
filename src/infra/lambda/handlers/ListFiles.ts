import { APIGatewayProxyResult } from 'aws-lambda';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';
import { FileType } from '../../../modules/files/entities/File';
import { listFilesUseCase } from '../../../modules/files/useCases/listFile';
import { constEnumType } from '../../../utils/ConstEnumType';

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const fileType = event.pathParameters?.fileType || '';
    const files = await listFilesUseCase.execute({
        lastFileId: event.queryStringParameters?.lastFileId,
        limit: Number(event.queryStringParameters?.limit || 1),
        type: fileType as constEnumType<typeof FileType>,
    });

    return formatJSONResponse(files);
};

export const main = middyfy(handler);
