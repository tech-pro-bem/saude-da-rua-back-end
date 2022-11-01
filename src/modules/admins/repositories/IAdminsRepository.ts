import { Admin } from "../entities/Admin";

export interface IAdminsRepository {
    checkIfAdminExistsByEmail(email: string): Promise<boolean>;

    saveAdmin(admin: Admin): Promise<boolean>;

    getAdminByEmail(email: string): Promise<Admin>;
}
