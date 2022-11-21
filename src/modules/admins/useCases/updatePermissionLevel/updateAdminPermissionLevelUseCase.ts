import { IAdminsRepository } from '../../repositories/IAdminsRepository';
import { IUpdateAdminPermissionLevelRequestDTO } from './updateAdminPermissionLevelRequestDTO';
import { ValidationError } from '../../../../helpers/errors';
import { AdminPermissionLevels }  from "../../entities/Admin"

class UpdateAdminPermissionLevelUseCase {
    private adminsRepository: IAdminsRepository;

    constructor(adminsRepository: IAdminsRepository) {
        this.adminsRepository = adminsRepository;
    }

    async execute(
        updateAdminPermissionLevelRequestData: IUpdateAdminPermissionLevelRequestDTO
    ): Promise<void> {
        const { id, permissionLevel } = updateAdminPermissionLevelRequestData;

        if(!Object.values(AdminPermissionLevels).includes(permissionLevel as AdminPermissionLevels)) {
            throw new ValidationError("This permission level is not allowed")
        }

        await this.adminsRepository.updateAdminPermissionLevelUseCase(id, permissionLevel);
    }
}

export { UpdateAdminPermissionLevelUseCase };
