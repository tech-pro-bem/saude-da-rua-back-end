import IDeleteAdminRepository from '../../repositories/interfaces/IDeleteAdminRepository';
import IDeleteAdminRequestDTO from './DeleteAdminRequestDTO';

class DeleteAdminUseCase {
    private deleteAdminRepository: IDeleteAdminRepository;

    constructor(deleteAdminRepository: IDeleteAdminRepository) {
        this.deleteAdminRepository = deleteAdminRepository;
    }

    async execute(deleteAdminRequestData: IDeleteAdminRequestDTO) {
        const { email } = deleteAdminRequestData;
        console.log('antes de findByEmail:');

        const adminFound: boolean =
            await this.deleteAdminRepository.findByEmail(email);
        console.log('depois do findByEmail');
        if (adminFound === false) {
            throw new Error('400');
        }

        await this.deleteAdminRepository.deleteAdmin(email);
    }
}
export default DeleteAdminUseCase;
