import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { FileType } from '../entities/File';
import { ListFileValidation } from '../utils/validations/fileValidations';
import listFilesUseCase from '../useCases/listFile';

type TParsedFromEventQueryString = {
    [name: string]: string;
};

type TQueryStringParameters = {
    fileType: FileType
}

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const response: APIGatewayProxyResult = {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {
            'content-type': 'application/json',
        },
        body: '',
    };

    const parsedQueryString: TParsedFromEventQueryString = event.queryStringParameters;

    try {
        const listFileValidation = new ListFileValidation(parsedQueryString);

        const listFilePayloadValidated: TQueryStringParameters =
            await listFileValidation.validateInput();

        const files = await listFilesUseCase.execute(listFilePayloadValidated);

        response.body = JSON.stringify({
            files
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
