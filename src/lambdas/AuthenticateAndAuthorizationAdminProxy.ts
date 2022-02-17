import {
    APIGatewayRequestAuthorizerEventV2,
    APIGatewayAuthorizerResult,
    Context,
    Callback,
} from 'aws-lambda';
import AuthenticateAdminMiddleware from '../middlewares/AuthenticateAdminMiddleware';
import AuthorizeAdminMiddleware from '../middlewares/AuthorizeAdminMiddleware';

interface IContext {
    subject?: string;
}

export const handler = async (
    event: APIGatewayRequestAuthorizerEventV2,
    _context: Context,
    callback: Callback
) => {
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
        context: {
            subject: 'No Access',
        },
    };

    try {
        const authenticateAdminMiddlware = new AuthenticateAdminMiddleware(
            event
        );

        response = authenticateAdminMiddlware.authenticate();

        const { subject }: IContext = response.context;

        const authorizeAdminMiddleware = new AuthorizeAdminMiddleware(subject);

        authorizeAdminMiddleware.authorize();
    } catch (error) {
        if (error.name === 'AuthorizationError') {
            response.policyDocument.Statement[0].Effect = 'Deny';

            callback(null, response);
        } else {
            callback('Unauthorized');
        }
    }

    return response;
};
