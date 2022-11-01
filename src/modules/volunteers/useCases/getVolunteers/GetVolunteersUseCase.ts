import { IVolunteersRepository } from '../../repositories/IVolunteersRepository';
import { IGetVolunteersRequestDTO } from './GetVolunteersRequestDTO';

class GetVolunteersUseCase {
    private volunteersRepository: IVolunteersRepository;

    constructor(volunteersRepository: IVolunteersRepository) {
        this.volunteersRepository = volunteersRepository;
    }

    async execute(getVolunteersRequestData: IGetVolunteersRequestDTO) {
        const { lastVolunteerId, limit } = getVolunteersRequestData;

        const volunteersListAndLastValueted =
            await this.volunteersRepository.getVolunteers({
                lastVolunteerId,
                limit,
            });

        return volunteersListAndLastValueted;
    }
}

export default GetVolunteersUseCase;
