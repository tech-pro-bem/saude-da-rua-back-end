import { APIGatewayProxyResult } from 'aws-lambda';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';
import { getAdminsUseCase } from '../../../modules/admins/useCases/getAdmins';
import { GetAdminsValidation } from '../../../utils/validations/adminValidations';

type QueryStringParameters = {
    lastAdminId: string | null;
    limit: number;
};

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const parsedQueryString = event.queryStringParameters;

    const getAdminsValidation = new GetAdminsValidation(
        parsedQueryString
    );

    const getAdminsPayloadValidated: QueryStringParameters =
        await getAdminsValidation.validateInput();

    console.log(getAdminsPayloadValidated)

    const AdminsListAndLastValueted = await getAdminsUseCase.execute(
        getAdminsPayloadValidated
    );

    return formatJSONResponse(AdminsListAndLastValueted);
};

export const main = middyfy(handler);
