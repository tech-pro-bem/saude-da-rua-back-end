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
            await this.createAdminRepository.findByEmail(email);

        if (adminAlreadyExists === true) {
            throw new ConflictError(
                'There is an admin account with that email'
            );
        }

        const newAdmin = new Admin(email, name, password);

        await this.createAdminRepository.saveAdmin(newAdmin);
    }
}

export default CreateAdminUseCase;
