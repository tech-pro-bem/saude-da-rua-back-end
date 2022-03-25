import { verify } from 'jsonwebtoken';

interface IPayload {
    email: string;
    sub?: string;
}

export class VerifyJWT {
    private secretKey: string;

    private token: string;

    constructor(token: string, jwtType?: string) {
        this.token = token;

        if (jwtType === 'ADMIN') {
            this.secretKey = process.env.ADMIN_JWT_SECRET_KEY;
        } else {
            this.secretKey = process.env.VOLUNTEER_JWT_SECRET_KEY;
        }
    }

    public payloadFromCheckedToken = (): IPayload => {
        const payload = verify(this.token, this.secretKey, {
            complete: false,
        }) as IPayload;

        return payload;
    };
}
