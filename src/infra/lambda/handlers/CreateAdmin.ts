import { APIGatewayProxyResult } from 'aws-lambda';
import { createAdminUseCase } from '../../../modules/admins/useCases/createAdmin';
import { CreateAdminValidation } from '../../../utils/validations/adminValidations';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';

interface IPayloadCreateAdminValidation {
    email: string;

    name: string;

    password: string;
}

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const createAdminValidation = new CreateAdminValidation(event.body);

    const createAdminPayloadValidation: IPayloadCreateAdminValidation =
        await createAdminValidation.validateInput();

    await createAdminUseCase.execute(createAdminPayloadValidation);

    return formatJSONResponse(
        {
            message: 'Successfully create Admin account',
        },
        201
    );
};

export const main = middyfy(handler);
