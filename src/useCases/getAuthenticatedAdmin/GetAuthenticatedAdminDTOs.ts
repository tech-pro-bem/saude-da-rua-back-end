type TGetAuthenticatedAdminDTO = {
    email: string;
};

type TGetAuthenticatedAdminResponseDTO = {
    email: string;
    id: string;
    name: string;
    permissionLevel: string;
};

export { TGetAuthenticatedAdminDTO, TGetAuthenticatedAdminResponseDTO };
