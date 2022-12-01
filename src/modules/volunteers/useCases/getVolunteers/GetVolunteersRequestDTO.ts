type IGetVolunteersRequestDTO = {
    page: number | null;
    limit: number;
    searchTerm?: string;
};

export { IGetVolunteersRequestDTO };
