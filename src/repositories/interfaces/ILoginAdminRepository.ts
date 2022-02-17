/* eslint-disable no-unused-vars */
import Admin from '../../entities/Admin';

export interface ILoginAdminRepository {
    getAdminInfoByEmail(email: string): Promise<Admin>;
}
