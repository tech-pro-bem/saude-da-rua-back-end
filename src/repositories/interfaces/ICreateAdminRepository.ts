/* eslint-disable no-unused-vars */
import Admin from '../../entities/Admin';

export interface ICreateAdminRepository {
    saveAdmin(admin: Admin): Promise<boolean>;
}
