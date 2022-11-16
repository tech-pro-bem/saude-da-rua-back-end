import { APIGatewayProxyResult } from 'aws-lambda';
import { getLongLivedTokenUseCase } from '../../../modules/auth/useCases/getLongLivedToken';
import { GetLongLivedTokenDTO } from '../../../modules/auth/useCases/getLongLivedToken/GetLongLivedTokenDTOs';
import { GetLongLivedTokenValidation } from '../../../utils/validations/authValidations/GetLongLivedTokenValidation';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const parsedQueryString = event.queryStringParameters;

    const getLongLivedTokenValidation = new GetLongLivedTokenValidation(
        parsedQueryString
    );

    const validationPayload: GetLongLivedTokenDTO =
        await getLongLivedTokenValidation.validate();

    await getLongLivedTokenUseCase.execute(validationPayload);

    return formatJSONResponse(
        { message: 'You can close this window now!' },
        200
    );
};

export const main = middyfy(handler);
