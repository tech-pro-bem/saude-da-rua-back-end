import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { CreateVolunteerValidation } from '../utils/validations/volunteerValidations';
import { TVolunteerProps } from '../entities/Volunteer';
import createVolunteerUseCase from '../useCases/createVolunteer';

interface IParsedfromEventBody {
    [name: string]: any;
}

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const response: APIGatewayProxyResult = {
        isBase64Encoded: false,
        statusCode: 201,
        headers: {
            'content-type': 'application/json',
        },
        body: '',
    };
    const parsedBody: IParsedfromEventBody = JSON.parse(event.body);

    try {
        const createVolunteerValidation = new CreateVolunteerValidation(
            parsedBody
        );

        const createVolunteerPayloadValidated: TVolunteerProps =
            await createVolunteerValidation.validateInput();

        await createVolunteerUseCase.execute(createVolunteerPayloadValidated);

        response.body = JSON.stringify({
            message: 'Successfully create volunteer',
        });
    } catch (error) {
        response.statusCode = error.code;
        response.body = JSON.stringify({
            errorClassName: error.name,
            generalErrorMessage: error.generalErrorMessage,
            mainErrorMessage: error.mainErrorMessage,
        });
    }

    return response;
};
