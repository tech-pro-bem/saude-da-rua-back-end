/* eslint-disable no-console */
import {
    APIGatewayProxyEventV2WithRequestContext,
    APIGatewayProxyResult,
} from 'aws-lambda';
import deleteAdminUseCase from '../useCases/deleteAdmin';
import DeleteAdminValidation from '../utils/validations/DeleteAdminValidation';

interface IParsedfromEventBody {
    [name: string]: any;
}

interface IPayloadCreateAdminValidation {
    email: string;
}

export const handler = async (
    // Aqui passa pelo lambda auth, então mudar
    event: APIGatewayProxyEventV2WithRequestContext<any>
): Promise<APIGatewayProxyResult> => {
    const response: APIGatewayProxyResult = {
        isBase64Encoded: false,
        statusCode: 201,
        body: '',
        headers: {
            'content-type': 'application/json',
        },
    };

    try {
        console.log('open first perform 001');
        const parsedBody: IParsedfromEventBody = JSON.parse(event.body);
        console.log('close first perform 001');
        console.log('open second perform 002');
        const deleteAdminValidation = new DeleteAdminValidation(parsedBody);
        console.log('close second perform 002');
        console.log('open third perform 003');
        const deleteAdminPayloadValidation: IPayloadCreateAdminValidation =
            await deleteAdminValidation.validateInput();
        console.log('close third perform 003');
        await deleteAdminUseCase.execute(deleteAdminPayloadValidation);
        console.log('exit perform usecase');

        response.body = JSON.stringify({
            message: 'Sucessfuly delete Admin account',
        });
    } catch (error) {
        switch (error.message) {
            case '400':
                response.statusCode = 400;
                response.body = JSON.stringify({
                    mainMessage: 'Faile to delete admin',
                    errorMessage: 'Incorrect body',
                });
                break;
            case '403':
                response.statusCode = 403;
                response.body = JSON.stringify({
                    mainMessage: 'Failed to delete admin acount',
                    errorMessage: 'Admin dos not have access',
                });
                break;
            default:
                response.statusCode = 500;
                response.body = JSON.stringify({
                    mainMessage: 'Failed to delete admin code:002',
                    errorMessage: 'erro 500',
                });
        }
    }
    return response;
};
