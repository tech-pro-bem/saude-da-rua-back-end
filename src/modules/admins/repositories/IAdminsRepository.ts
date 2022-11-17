import { Admin } from "../entities/Admin";

export interface IAdminsRepository {
    checkIfAdminExistsByEmail(email: string): Promise<boolean>;

    saveAdmin(admin: Admin): Promise<boolean>;

    deleteAdmin(id: string): Promise<void>;

    getAdminByEmail(email: string): Promise<Admin>;
}
