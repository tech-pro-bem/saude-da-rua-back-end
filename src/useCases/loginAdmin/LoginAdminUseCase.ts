import { compareSync } from 'bcryptjs';
import Admin from '../../entities/Admin';
import ILoginAdminRepository from '../../repositories/interfaces/ILoginAdminRepository';
import ILoginAdminRequestDTO from './LoginAdminRequestDTO';
import CreateJwt from '../../utils/auth/CreateJWT';
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

        const getAdminData: Admin = await this.loginAdminRepository.findByEmail(
            email
        );

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

        const createJWT = new CreateJwt(
            {
                id: getAdminData.id,
                name: getAdminData.name,
            },
            getAdminData.permissionLevel
        );

        const getToken: string = createJWT.buildToken();

        return getToken;
    }
}

export default LoginAdminUseCase;
