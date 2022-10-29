import { compareSync } from 'bcryptjs';
import { CreateJwt } from '../../../../utils/auth';
import { NotFoundError } from '../../../../helpers/errors';
import { IAdminsRepository } from '../../repositories/IAdminsRepository';
import { ILoginAdminRequestDTO } from './LoginAdminRequestDTO';

class LoginAdminUseCase {
    private adminsRepository: IAdminsRepository;

    constructor(adminsRepository: IAdminsRepository) {
        this.adminsRepository = adminsRepository;
    }

    async execute(
        loginAdminRequestData: ILoginAdminRequestDTO
    ): Promise<string> {
        const { email, password } = loginAdminRequestData;

        const admin = await this.adminsRepository.getAdminByEmail(email);

        if (admin === null) {
            throw new NotFoundError('Incorrect Email/Password');
        }

        const comparePassword: boolean = compareSync(
            password,
            admin.passwordHash
        );

        if (comparePassword !== true) {
            throw new NotFoundError('Incorrect Email/Password');
        }

        const createJWT = new CreateJwt({
            payload: {
                id: admin.id,
                email: admin.email,
            },
            options: admin.permissionLevel,
            jwtType: 'ADMIN',
        });

        const getToken: string = createJWT.buildToken();

        return getToken;
    }
}

export { LoginAdminUseCase };
