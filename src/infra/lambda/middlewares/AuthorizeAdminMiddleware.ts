import { AuthorizationError } from '../../../helpers/errors';
import { AdminPermissionLevels } from '../../../modules/admins/entities/Admin'

class AuthorizeAdminMiddleware {
    private subToAuthorize: string;

    constructor(subFromCheckedToken: string) {
        this.subToAuthorize = subFromCheckedToken;
    }

    public authorize = (): void => {
        const adminPermissionLevel: string = AdminPermissionLevels.Admin

        if (this.subToAuthorize !== adminPermissionLevel) {
            throw new AuthorizationError(
                'This Admin account does not have access to this feature'
            );
        }
    };
}

export { AuthorizeAdminMiddleware };
