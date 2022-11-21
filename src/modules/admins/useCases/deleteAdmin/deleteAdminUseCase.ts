import { IAdminsRepository } from '../../repositories/IAdminsRepository';
import { IDeleteAdminRequestDTO } from './deleteAdminRequestDTO';

class DeleteAdminUseCase {
    private adminsRepository: IAdminsRepository;

    constructor(adminsRepository: IAdminsRepository) {
        this.adminsRepository = adminsRepository;
    }

    async execute(
        deleteAdminRequestData: IDeleteAdminRequestDTO
    ): Promise<void> {
        const { id } = deleteAdminRequestData;

        await this.adminsRepository.deleteAdmin(id)
    }
}

export { DeleteAdminUseCase };
