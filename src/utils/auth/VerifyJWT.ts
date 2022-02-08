import { verify } from 'jsonwebtoken';

interface IPayload {
    admin: {
        id: string;
        name: string;
    };

    sub: string;
}

class VerifyJWT {
    private secretKey: string = process.env.JWT_SECRET;

    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    public payloadFromCheckedToken = (): IPayload => {
        const payload = verify(this.token, this.secretKey, {
            complete: false,
        }) as IPayload;

        return payload;
    };
}

export default VerifyJWT;
