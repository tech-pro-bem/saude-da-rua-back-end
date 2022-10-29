type GetAuthenticatedAdminDTO = {
    email: string;
};

type GetAuthenticatedAdminResponseDTO = {
    email: string;
    id: string;
    name: string;
    permissionLevel: string;
};

export { GetAuthenticatedAdminDTO, GetAuthenticatedAdminResponseDTO };
