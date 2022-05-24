/* eslint-disable prettier/prettier */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import UpdateVolunteerUseCase from "../useCases/UpdateVolunteers";
import { UpdateVolunteerValidation } from "../utils/validations/volunteerValidations";
import { Volunteer } from "../entities/Volunteer";

interface IParsedfromEventBody {
    [name: string]: any;
}

interface IUpdateVolunteerValidation {
    partialVolunteer: Partial<Volunteer>;
}

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const response: APIGatewayProxyResult = {
        isBase64Encoded: false,
        statusCode: 201,
        headers: {
            "content-type": "application/json",
        },
        body: "",
    };

    const {email} = event.pathParameters
    const parsedBody: IParsedfromEventBody = { ...JSON.parse(event.body), email };

    try {
        const PutUpdateVolunteerValidation = new UpdateVolunteerValidation(
            parsedBody
        );

        const UpdateVolunteerPayloadValidated: IUpdateVolunteerValidation =
            await PutUpdateVolunteerValidation.validateUpdate();

        await UpdateVolunteerUseCase.execute(UpdateVolunteerPayloadValidated);

        response.body = JSON.stringify({
            message: "Successfully updated volunteer",
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
