import Admin from '../../entities/Admin';
import IAdminRepository from '../../repositories/interfaces/IAdminRepository';
import ICreateAdminVolunteerRequestDTO from './CreateAdminDTO';

class CreateAdminUseCase {
    private adminRepository: IAdminRepository;

    constructor(adminRepository: IAdminRepository) {
        this.adminRepository = adminRepository;
    }

    async execute(createAdminData: ICreateAdminVolunteerRequestDTO) {
        const { email, name, password } = createAdminData;

        const adminAlreadyExists: boolean =
            await this.adminRepository.findByEmail(email);

        if (adminAlreadyExists === false) {
            throw new Error('400');
        }

        const newAdmin = new Admin(email, name, password);

        await this.adminRepository.saveAdmin(newAdmin);
    }
}

export default CreateAdminUseCase;
