import { IVolunteersRepository } from '../../repositories/IVolunteersRepository';
import { IGetVolunteersRequestDTO } from './GetVolunteersRequestDTO';

class GetVolunteersUseCase {
    private volunteersRepository: IVolunteersRepository;

    constructor(volunteersRepository: IVolunteersRepository) {
        this.volunteersRepository = volunteersRepository;
    }

    async execute(getVolunteersRequestData: IGetVolunteersRequestDTO) {
        const { page, limit, searchTerm } = getVolunteersRequestData;

        const volunteersListAndLastValueted =
            await this.volunteersRepository.getVolunteers({
                page,
                limit,
                searchTerm
            });

        return volunteersListAndLastValueted;
    }
}

export default GetVolunteersUseCase;
