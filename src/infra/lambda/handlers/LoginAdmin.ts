import { APIGatewayProxyResult } from 'aws-lambda';
import { loginAdminUseCase } from '../../../modules/admins/useCases/loginAdmin';
import { LoginAdminValidation } from '../../../utils/validations/adminValidations';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';

interface IPayloadLoginAdminValidation {
    email: string;

    password: string;
}

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const loginAdminvalidation = new LoginAdminValidation(event.body);

    const loginPayloadValidation: IPayloadLoginAdminValidation =
        await loginAdminvalidation.validateInput();

    const token = await loginAdminUseCase.execute(loginPayloadValidation);

    return formatJSONResponse({
        mainMessage: 'Sucessfully Log in',
        token,
    });
};

export const main = middyfy(handler);
