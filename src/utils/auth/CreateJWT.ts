import { sign, SignOptions, Algorithm } from 'jsonwebtoken';

type PayloadJwt = {
    id?: string;
    email: string;
};

type ConstructorCreateJwtProps = {
    payload: PayloadJwt;
    options?: string;
    jwtType?: string;
};

export class CreateJwt {
    private algorithmType: Algorithm = 'HS512';

    private readonly lifeCycle: string;

    private readonly secretKey: string;

    private payload: PayloadJwt;

    private options: string;

    constructor(props: ConstructorCreateJwtProps) {
        this.payload = props.payload;

        if (props.options) this.options = props.options;

        if (props.jwtType === 'ADMIN') {
            this.lifeCycle = process.env.ADMIN_JWT_LIFE_CYCLE;
            this.secretKey = process.env.ADMIN_JWT_SECRET_KEY;
        } else {
            this.lifeCycle = process.env.VOLUNTEER_JWT_LIFE_CYCLE;
            this.secretKey = process.env.VOLUNTEER_JWT_SECRET_KEY;
        }
    }

    public buildToken(): string {
        const signOptions: SignOptions =
            this.options === undefined
                ? {
                      algorithm: this.algorithmType,
                      expiresIn: this.lifeCycle,
                  }
                : {
                      algorithm: this.algorithmType,
                      expiresIn: this.lifeCycle,
                      subject: this.options,
                  };

        const token: string =
            this.options === undefined
                ? sign(
                      {
                          email: this.payload.email,
                      },
                      this.secretKey,
                      signOptions
                  )
                : sign(
                      {
                          email: this.payload.email,
                      },
                      this.secretKey,
                      signOptions
                  );

        return token;
    }
}
