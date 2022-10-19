export type AdminDTO = {
    id: string;
    email: string;
    name: string;
    passwordHash: string;
    permissionLevel: string;
};

export interface ILoginAdminRepository {
    getAdminInfoByEmail(email: string): Promise<AdminDTO>;
}
