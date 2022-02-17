/* eslint-disable no-unused-vars */
import Admin from '../../entities/Admin';

export interface ICreateAdminRepository {
    checkIfAdminExistsByEmail(email: string): Promise<boolean>;

    saveAdmin(admin: Admin): Promise<boolean>;
}
