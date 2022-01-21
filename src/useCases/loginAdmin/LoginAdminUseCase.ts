import { compareSync } from 'bcryptjs';
import Admin from '../../entities/Admin';
import ILoginAdminRepository from '../../repositories/interfaces/ILoginAdminRepository';
import ILoginAdminRequestDTO from './LoginAdminRequestDTO';
import CreateJwt from '../../utils/auth/CreateJWT';

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

        // Talvez tenha que adicionar o marshal()
        const comparePassword: boolean = compareSync(
            password,
            getAdminData.password
        );

        if (comparePassword === true) {
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
        throw new Error('400');
    }
}

export default LoginAdminUseCase;
