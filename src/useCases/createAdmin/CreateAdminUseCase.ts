import Admin from '../../entities/Admin';
import ICreateAdminRepository from '../../repositories/interfaces/ICreateAdminRepository';
import ICreateAdminRequestDTO from './CreateAdminRequestDTO';

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
            throw new Error('400');
        }

        const newAdmin = new Admin(email, name, password);

        await this.createAdminRepository.saveAdmin(newAdmin);
    }
}

export default CreateAdminUseCase;
