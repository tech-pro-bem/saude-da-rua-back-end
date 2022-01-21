/* eslint-disable no-unused-vars */
import Admin from '../../entities/Admin';

interface ILoginAdminRepository {
    findByEmail(email: string): Promise<Admin>;
}

export default ILoginAdminRepository;
