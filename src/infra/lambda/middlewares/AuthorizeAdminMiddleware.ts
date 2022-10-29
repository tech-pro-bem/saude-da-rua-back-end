import md5 from 'md5';
import { AuthorizationError } from '../../../helpers/errors';

class AuthorizeAdminMiddleware {
    private subToAuthorize: string;

    constructor(subFromCheckedToken: string) {
        this.subToAuthorize = subFromCheckedToken;
    }

    public authorize = (): void => {
        const envPermissionLevel: string = md5(process.env.TOKEN_TWO);

        if (this.subToAuthorize !== envPermissionLevel) {
            throw new AuthorizationError(
                'This Admin account does not have access to this feature'
            );
        }
    };
}

export { AuthorizeAdminMiddleware };
