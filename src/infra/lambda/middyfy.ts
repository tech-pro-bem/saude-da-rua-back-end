import middyJsonBodyParser from '@middy/http-json-body-parser';
import middy from '@middy/core';
import type {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Handler,
} from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';
import { DefaultError, InternalServerError } from '../../helpers/errors';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
    body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
    ValidatedAPIGatewayProxyEvent<S>,
    APIGatewayProxyResult
>;

export type APIEventBodySchema<S = { [name: string]: any }> = Omit<
    APIGatewayProxyEvent,
    'body'
> & {
    body: S;
};

export const formatJSONResponse = (response?: unknown, statusCode = 400) => ({
    statusCode,
    body: response ? JSON.stringify(response) : undefined,
});

function exceptionHandler({ error }: { error: Error | null }) {
    if (error instanceof DefaultError) {
        return formatJSONResponse(
            {
                errorClassName: error.name,
                generalErrorMessage: error.generalErrorMessage,
                mainErrorMessage: error.mainErrorMessage,
            },
            error.code
        );
    }

    const internalServerError = new InternalServerError();
    // would be good to report this unknown error somewhere, maybe sentry? idk
    console.log(error);
    return formatJSONResponse(
        {
            errorClassName: internalServerError.name,
            generalErrorMessage: internalServerError.generalErrorMessage,
            mainErrorMessage: internalServerError.mainErrorMessage,
        },
        internalServerError.code
    );
}

export const middyfy = (handler: (event: any) => any) =>
    middy(handler).use(middyJsonBodyParser()).onError(exceptionHandler);
