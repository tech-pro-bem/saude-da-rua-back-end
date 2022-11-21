import { APIGatewayProxyResult } from 'aws-lambda';
import { middyfy, formatJSONResponse, APIEventBodySchema } from '../middyfy';
import { updatePixKeyUseCase } from '../../../modules/pix/useCases/updatePixKey';

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const { body } = event;

    const key = body?.key
    await updatePixKeyUseCase.execute({
        key
    });

    return formatJSONResponse(
        {
            message: 'Successfully updated/created the pix Key',
        },
        209
    );
};

export const main = middyfy(handler);
