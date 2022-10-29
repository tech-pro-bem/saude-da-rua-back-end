import { APIGatewayProxyResult } from 'aws-lambda';
import { verifyVolunteerEmailUseCase } from '../../../modules/volunteers/useCases/verifyVolunteerEmail';
import { VerifyVolunteerEmailValidation } from '../../../utils/validations/volunteerValidations/VerifyVolunteerEmailValidation';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';

type ParsedFromEventQueryString = {
    [name: string]: string;
};

type JwtQueryStringParameter = {
    token: string;
};

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const jwtFromVolunteerEmail: ParsedFromEventQueryString =
        event.queryStringParameters;

    const verifyVolunteerEmailValidation = new VerifyVolunteerEmailValidation(
        jwtFromVolunteerEmail
    );

    const verifyVolunteerEmailPayloadValidated: JwtQueryStringParameter =
        await verifyVolunteerEmailValidation.validateInput();

    await verifyVolunteerEmailUseCase.execute(
        verifyVolunteerEmailPayloadValidated
    );

    return formatJSONResponse(undefined, 200);
};

export const main = middyfy(handler);
