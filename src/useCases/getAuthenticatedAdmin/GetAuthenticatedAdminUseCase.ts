import { NotFoundError } from '../../helpers/errors';
import { ILoginAdminRepository } from '../../repositories/interfaces';
import TGetAuthenticatedAdminDTO from './GetAuthenticatedAdminDTO';

class GetAuthenticatedAdminUseCase {
    constructor(private loginAdminRepository: ILoginAdminRepository) {}

    async execute(getAuthenticatedAdminDTO: TGetAuthenticatedAdminDTO) {
        const admin = await this.loginAdminRepository.getAdminInfoByEmail(
            getAuthenticatedAdminDTO.email
        );

        if (!admin) {
            throw new NotFoundError('Admin not found');
        }

        const { id, email, permissionLevel } = admin;
        return {
            email,
            id,
            permissionLevel,
        };
    }
}

export default GetAuthenticatedAdminUseCase;
