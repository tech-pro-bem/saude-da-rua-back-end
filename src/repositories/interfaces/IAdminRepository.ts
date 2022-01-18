/* eslint-disable no-unused-vars */

import Admin from '../../entities/Admin';

interface IAdminRepository {
    findByEmail(email: string): Promise<boolean>;

    saveAdmin(admin: Admin): Promise<boolean>;
}

export default IAdminRepository;
