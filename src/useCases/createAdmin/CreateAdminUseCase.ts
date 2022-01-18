import Admin from '../../entities/Admin';
import IAdminRepository from '../../repositories/interfaces/IAdminRepository';
import ICreateAdminVolunteerRequestDTO from './CreateAdminDTO';

class CreateAdminUseCase {
    private adminRepository: IAdminRepository;

    constructor(adminRepository: IAdminRepository) {
        this.adminRepository = adminRepository;
    }

    async execute(createAdminData: ICreateAdminVolunteerRequestDTO) {
        const { email, username, password } = createAdminData;

        const adminAlreadyExists: boolean =
            await this.adminRepository.findByEmail(email);

        if (adminAlreadyExists) {
            throw Error('400');
        }

        const newAdmin = new Admin({ email, username, password });

        await this.adminRepository.saveAdmin(newAdmin);
    }
}

export default CreateAdminUseCase;
