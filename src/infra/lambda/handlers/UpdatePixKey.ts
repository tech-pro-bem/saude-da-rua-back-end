import { APIGatewayProxyResult } from 'aws-lambda';
import { UpdatePixKeyValidation } from '../../../utils/validations/pixValidations/UpdatePixValidation';
import { middyfy, formatJSONResponse, APIEventBodySchema } from '../middyfy';
import { updatePixKeyUseCase } from '../../../modules/pix/useCases/updatePixKey';

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const updatePixKeyValidation = new UpdatePixKeyValidation(event.body);

    const updatePixKeyPayload = await updatePixKeyValidation.validate();

    await updatePixKeyUseCase.execute(updatePixKeyPayload);

    return formatJSONResponse(
        {
            message: 'Successfully updated/created the pix Key',
        },
        209
    );
};

export const main = middyfy(handler);
