import { IGetAdminsRequestDTO } from './GetAdminsRequestDTO';
import { IAdminsRepository } from '../../repositories/IAdminsRepository';


class GetAdminsUseCase {
    private adminRepository: IAdminsRepository;

    constructor(adminRepository: IAdminsRepository) {
        this.adminRepository = adminRepository;
    }

    async execute(getAdminRequestData: IGetAdminsRequestDTO) {
        console.log(getAdminRequestData)
        const { lastAdminId, limit = 10 } = getAdminRequestData;

        const adminListAndLastValueted =
            await this.adminRepository.list({
                lastAdminId,
                limit,
            });

        return adminListAndLastValueted;
    }
}

export default GetAdminsUseCase;
