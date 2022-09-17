import { hash } from 'bcryptjs';
import Admin from '../../entities/Admin';
import { ICreateAdminRepository } from '../../repositories/interfaces';
import ICreateAdminRequestDTO from './CreateAdminRequestDTO';
import { ConflictError } from '../../helpers/errors';

class CreateAdminUseCase {
    private createAdminRepository: ICreateAdminRepository;

    constructor(createAdminRepository: ICreateAdminRepository) {
        this.createAdminRepository = createAdminRepository;
    }

    async execute(createAdminRequestData: ICreateAdminRequestDTO) {
        const { email, name, password } = createAdminRequestData;

        const adminAlreadyExists: boolean =
            await this.createAdminRepository.checkIfAdminExistsByEmail(email);

        if (adminAlreadyExists === true) {
            throw new ConflictError(
                'There is an admin account with that email'
            );
        }

        const passwordHash = await hash(password, 10);

        const newAdmin = new Admin({ email, name, passwordHash });

        await this.createAdminRepository.saveAdmin(newAdmin);
    }
}

export default CreateAdminUseCase;
