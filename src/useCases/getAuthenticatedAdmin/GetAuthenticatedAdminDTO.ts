type TGetAuthenticatedAdminDTO = {
    email: string;
};

type TGetAuthenticatedAdminResponseDTO = {
   email: string;
   id: string;
   permissionLevel: string;
};

export default TGetAuthenticatedAdminDTO;
