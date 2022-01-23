import {
    APIGatewayRequestAuthorizerEventV2,
    APIGatewayAuthorizerResult,
    Context,
    Callback,
} from 'aws-lambda';
import AuthAdminMiddleware from '../middlewares/AuthAdminMiddleware';

export const handler = async (
    event: APIGatewayRequestAuthorizerEventV2,
    _context: Context,
    callback: Callback
) => {
    let response: APIGatewayAuthorizerResult;

    try {
        const authAdminMiddlware = new AuthAdminMiddleware(event);

        response = authAdminMiddlware.auth();
    } catch (err) {
        // Em produção, no lugar do erro trocar por 'Unauthorized'
        callback(err);
    }

    return response;
};
