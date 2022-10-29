import {
    APIGatewayRequestAuthorizerEventV2,
    APIGatewayAuthorizerResult,
    PolicyDocument,
} from 'aws-lambda';
import { VerifyJWT } from '../../../utils/auth';
import { AuthenticationError } from '../../../helpers/errors';
import { getParameterCaseInsensitive } from '../../../utils/GetParameterCaseInsensitive';

class AuthenticateAdminMiddleware {
    private event: APIGatewayRequestAuthorizerEventV2;

    private validToken: string;

    constructor(event: APIGatewayRequestAuthorizerEventV2) {
        this.event = event;

        this.validToken = AuthenticateAdminMiddleware.getToken(event);
    }

    static getPolicyDocument = (
        effect: string,
        resource: string
    ): PolicyDocument => ({
        Version: '2012-10-17',
        Statement: [
            {
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: resource,
            },
        ],
    });

    static getToken = (event: APIGatewayRequestAuthorizerEventV2): string => {
        if (!event.type || event.type !== 'REQUEST') {
            throw new AuthenticationError(
                `Expected 'event.type' parameter exists and to have a value equal to 'REQUEST'`
            );
        }

        const getTokenFromHeaders: string = getParameterCaseInsensitive(
            event.headers,
            'authorization'
        );

        if (!getTokenFromHeaders) {
            throw new AuthenticationError(
                'Expected "event.headers.authorizationToken" parameter to be set'
            );
        }

        const checkIfTokenMatches = getTokenFromHeaders.match(/^Bearer (.*)$/);

        if (!checkIfTokenMatches || checkIfTokenMatches.length < 2) {
            throw new AuthenticationError(
                `Invalid Authorization token - ${getTokenFromHeaders} does not match "Bearer .*"`
            );
        }

        return checkIfTokenMatches[1];
    };

    public authenticate = (): APIGatewayAuthorizerResult => {
        try {
            const verifyJWT = new VerifyJWT(this.validToken, 'ADMIN');
            const { email, sub } = verifyJWT.payloadFromCheckedToken();

            return {
                principalId: email,
                policyDocument: AuthenticateAdminMiddleware.getPolicyDocument(
                    'Allow',
                    this.event.routeArn
                ),
                context: {
                    subject: sub,
                    adminEmail: email,
                },
            };
        } catch (error) {
            throw new AuthenticationError('Expired or invalid token');
        }
    };
}

export { AuthenticateAdminMiddleware };
