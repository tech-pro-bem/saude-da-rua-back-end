import { NotFoundError } from '../../../../helpers/errors';
import {
    GetAuthenticatedAdminDTO,
    GetAuthenticatedAdminResponseDTO,
} from './GetAuthenticatedAdminDTOs';
import { IAdminsRepository } from '../../repositories/IAdminsRepository';

class GetAuthenticatedAdminUseCase {
    constructor(private adminsRepository: IAdminsRepository) {}

    async execute(
        getAuthenticatedAdminDTO: GetAuthenticatedAdminDTO
    ): Promise<GetAuthenticatedAdminResponseDTO> {
        const admin = await this.adminsRepository.getAdminByEmail(
            getAuthenticatedAdminDTO.email
        );

        if (!admin) {
            throw new NotFoundError('Admin not found');
        }

        const { id, email, permissionLevel, name } = admin;
        return {
            email,
            id,
            name,
            permissionLevel,
        };
    }
}

export { GetAuthenticatedAdminUseCase };
