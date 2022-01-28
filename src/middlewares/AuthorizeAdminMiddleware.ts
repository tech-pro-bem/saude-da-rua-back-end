import md5 from 'md5';

class AuthorizeAdminMiddleware {
    private subToAuthorize: string;

    constructor(subFromCheckedToken: string) {
        this.subToAuthorize = subFromCheckedToken;
    }

    public authorize = (): void => {
        const envPermissionLevel: string = md5(process.env.TOKEN_TWO);

        if (this.subToAuthorize !== envPermissionLevel) {
            throw new Error('403');
        }
    };
}

export default AuthorizeAdminMiddleware;
