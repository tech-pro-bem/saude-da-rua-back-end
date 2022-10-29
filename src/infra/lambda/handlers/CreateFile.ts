import { APIGatewayProxyResult } from 'aws-lambda';
import { middyfy, formatJSONResponse, APIEventBodySchema } from '../middyfy';
import { FileType } from '../../../modules/files/entities/File';
import { createFileUseCase } from '../../../modules/files/useCases/createFile';
import { constEnumType } from '../../../utils/ConstEnumType';

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const { body } = event;

    const fileType = event.pathParameters?.fileType || '';

    const data = body?.image?.data || body?.file?.data;
    const mime = body?.image?.mime || body?.file?.mime;
    await createFileUseCase.execute({
        base64File: data,
        fileType: fileType as constEnumType<typeof FileType>,
        fileMimeType: mime,
    });

    return formatJSONResponse(
        {
            message: 'Successfully create a new file',
        },
        201
    );
};

export const main = middyfy(handler);
