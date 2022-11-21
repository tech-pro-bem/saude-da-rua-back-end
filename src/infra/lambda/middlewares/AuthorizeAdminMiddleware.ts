import { AuthorizationError } from '../../../helpers/errors';
import { AdminPermissionLevels } from '../../../modules/admins/entities/Admin'

class AuthorizeAdminMiddleware {
    private subToAuthorize: string;

    constructor(subFromCheckedToken: string) {
        this.subToAuthorize = subFromCheckedToken;
    }

    public authorize = (): void => {
        const adminPermissionLevel: string = AdminPermissionLevels.Admin

        // TODO remove this when the permissions are updated in the database
        if (this.subToAuthorize !== adminPermissionLevel && this.subToAuthorize !== "0d39d2b19ff1484b4ab06ef219463d55" ) {
            throw new AuthorizationError(
                'This Admin account does not have access to this feature'
            );
        }
    };
}

export { AuthorizeAdminMiddleware };
