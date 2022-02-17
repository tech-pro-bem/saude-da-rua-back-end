/* eslint-disable no-unused-vars */
import Admin from '../../entities/Admin';

export interface ILoginAdminRepository {
    findByEmail(email: string): Promise<Admin>;
}
