export type AdminDTO = {
    email: string;
    password: string;
    permissionLevel: string;
};

export interface ILoginAdminRepository {
    getAdminInfoByEmail(email: string): Promise<AdminDTO>;
}
