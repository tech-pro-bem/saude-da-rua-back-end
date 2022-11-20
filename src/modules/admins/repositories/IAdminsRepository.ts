import { Admin } from "../entities/Admin";
import { IGetAdminsRequestDTO } from "../useCases/getAdmins/GetAdminsRequestDTO"

export interface IAdminsRepository {
    checkIfAdminExistsByEmail(email: string): Promise<boolean>;

    saveAdmin(admin: Admin): Promise<boolean>;

    deleteAdmin(id: string): Promise<void>;

    getAdminByEmail(email: string): Promise<Admin>;

    list(params: IGetAdminsRequestDTO) : Promise<Admin[]>;

    updateAdminPermissionLevelUseCase(id: string, level: string): Promise<void>
}
