import {
    APIGatewayRequestAuthorizerEventV2,
    APIGatewayAuthorizerResult,
    PolicyDocument,
} from 'aws-lambda';
import md5 from 'md5';
import VerifyJWT from '../utils/auth/VerifyJWT';
import DecodeJWT from '../utils/auth/DecodeJWT';

class AuthAdminMiddleware {
    private event: APIGatewayRequestAuthorizerEventV2;

    private verifyJWTFunction: Function;

    private validToken: string;

    constructor(event: APIGatewayRequestAuthorizerEventV2) {
        this.event = event;

        this.validToken = AuthAdminMiddleware.getToken(event);

        this.verifyJWTFunction = new VerifyJWT(this.validToken).checkToken;
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
        // Os lançamentos de erros não são retornados como corpo de Resposta!
        // Para vê-los, verifique o serviço: CloudWatchLogs.
        if (!event.type || event.type !== 'REQUEST') {
            throw new Error(
                `Expected 'event.type' parameter exists and to have a value equal to 'REQUEST'`
            );
        }

        const getTokenFromHeaders: string = event.headers.authorization;

        if (!getTokenFromHeaders) {
            throw new Error(
                'Expected "event.headers.authorizationToken" parameter to be set'
            );
        }

        const checkIfTokenMatches = getTokenFromHeaders.match(/^Bearer (.*)$/);

        if (!checkIfTokenMatches || checkIfTokenMatches.length < 2) {
            throw new Error(
                `Invalid Authorization token - ${getTokenFromHeaders} does not match "Bearer .*"`
            );
        }

        return checkIfTokenMatches[1];
    };

    private authenticateAdmin = (): boolean => {
        const decoded: boolean = this.verifyJWTFunction();

        return !!decoded;
    };

    private authorizeAdmin = (): string => {
        const envPermissionLevel: string = md5(process.env.TOKEN_ONE);
        const decodeJWT = new DecodeJWT(this.validToken);
        const { id, sub } = decodeJWT.catchPermissionAndIdAdmin();
        const adminPermissionLevel = md5(sub);

        if (adminPermissionLevel === envPermissionLevel) {
            return id;
        }

        throw new Error('Admin does not have access to this feature');
    };

    public auth = (): APIGatewayAuthorizerResult => {
        try {
            this.authenticateAdmin();

            const authorizedAdminId: string = this.authorizeAdmin();

            if (authorizedAdminId) {
                return {
                    principalId: authorizedAdminId,
                    policyDocument: AuthAdminMiddleware.getPolicyDocument(
                        'Allow',
                        this.event.routeArn
                    ),
                };
            }
        } catch (error) {
            throw new Error('Expired or invalid token');
        }

        return {
            principalId: 'Undefined',
            policyDocument: AuthAdminMiddleware.getPolicyDocument(
                'Deny',
                this.event.routeArn
            ),
        };
    };
}

export default AuthAdminMiddleware;
