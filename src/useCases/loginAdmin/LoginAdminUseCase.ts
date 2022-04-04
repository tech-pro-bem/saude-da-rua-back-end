import { compareSync } from 'bcryptjs';
import Admin from '../../entities/Admin';
import { ILoginAdminRepository } from '../../repositories/interfaces';
import ILoginAdminRequestDTO from './LoginAdminRequestDTO';
import { CreateJwt } from '../../utils/auth';
import { NotFoundError } from '../../helpers/errors';

class LoginAdminUseCase {
    private loginAdminRepository: ILoginAdminRepository;

    constructor(loginAdminRepository: ILoginAdminRepository) {
        this.loginAdminRepository = loginAdminRepository;
    }

    async execute(
        loginAdminRequestData: ILoginAdminRequestDTO
    ): Promise<string> {
        const { email, password } = loginAdminRequestData;

        const getAdminData: Admin =
            await this.loginAdminRepository.getAdminInfoByEmail(email);

        if (getAdminData === undefined) {
            throw new NotFoundError('Incorrect Email/Password');
        }

        const comparePassword: boolean = compareSync(
            password,
            getAdminData.password
        );

        if (comparePassword !== true) {
            throw new NotFoundError('Incorrect Email/Password');
        }

        const createJWT = new CreateJwt({
            payload: {
                id: getAdminData.id,
                email: getAdminData.email,
            },
            options: getAdminData.permissionLevel,
            jwtType: 'ADMIN',
        });

        const getToken: string = createJWT.buildToken();

        return getToken;
    }
}

export default LoginAdminUseCase;
