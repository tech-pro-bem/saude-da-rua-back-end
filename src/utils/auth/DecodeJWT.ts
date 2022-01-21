import { decode, Jwt, JwtHeader, JwtPayload } from 'jsonwebtoken';
import md5 from 'md5';

interface IDecoded extends Jwt {
    header: JwtHeader;

    payload: JwtPayload;

    signature: string;
}

class DecodeJWT {
    private firstOption: string = md5(process.env.TOKEN_ONE);

    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    public authorize = (): IDecoded => {
        const { sub } = decode(this.token, { complete: true }) as IDecoded;

        return decodedJWT;
    };
}

export default DecodeJWT;
