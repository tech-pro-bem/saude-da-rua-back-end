import { hash } from 'bcryptjs';
import { Admin } from '../../entities/Admin';
import { ICreateAdminRequestDTO } from './CreateAdminRequestDTO';
import { ConflictError } from '../../../../helpers/errors';
import { IAdminsRepository } from '../../repositories/IAdminsRepository';

class CreateAdminUseCase {
    private adminsRepository: IAdminsRepository;

    constructor(adminsRepository: IAdminsRepository) {
        this.adminsRepository = adminsRepository;
    }

    async execute(createAdminRequestData: ICreateAdminRequestDTO) {
        const { email, name, password } = createAdminRequestData;

        const adminAlreadyExists: boolean =
            await this.adminsRepository.checkIfAdminExistsByEmail(email);

        if (adminAlreadyExists === true) {
            throw new ConflictError(
                'There is an admin account with that email'
            );
        }

        const passwordHash = await hash(password, 10);

        const newAdmin = new Admin({ email, name, passwordHash });

        await this.adminsRepository.saveAdmin(newAdmin);
    }
}

export { CreateAdminUseCase };
