import { sign, SignOptions, Algorithm } from 'jsonwebtoken';

interface IPayloadJwt {
    id: string;

    name: string;
}

export class CreateJwt {
    private algorithmType: Algorithm = 'HS512';

    private lifeCycle: string = process.env.JWT_LIFE_CYCLE;

    private secretKey = process.env.JWT_SECRET;

    private payload: IPayloadJwt;

    private options: string;

    constructor(payload: IPayloadJwt, options: string) {
        this.payload = payload;
        this.options = options;
    }

    public buildToken(): string {
        const signOptions: SignOptions = {
            algorithm: this.algorithmType,
            expiresIn: this.lifeCycle,
            subject: this.options,
        };

        const token: string = sign(
            {
                admin: this.payload,
            },
            this.secretKey,
            signOptions
        );

        return token;
    }
}
