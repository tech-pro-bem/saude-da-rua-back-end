import {
    APIGatewayRequestAuthorizerEventV2,
    APIGatewayAuthorizerResult,
    Context,
    Callback,
} from 'aws-lambda';
import AuthenticateAdminMiddleware from '../middlewares/AuthenticateAdminMiddleware';

export const handler = async (
    event: APIGatewayRequestAuthorizerEventV2,
    _context: Context,
    callback: Callback
): Promise<APIGatewayAuthorizerResult> => {
    let response: APIGatewayAuthorizerResult = {
        principalId: 'Undefined',
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: 'Deny',
                    Resource: event.routeArn,
                },
            ],
        },
    };

    try {
        const authenticateAdminMiddlware = new AuthenticateAdminMiddleware(
            event
        );

        response = authenticateAdminMiddlware.authenticate();
    } catch (err) {
        callback('Unauthorized');
    }

    return response;
};
