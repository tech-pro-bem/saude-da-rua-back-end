import { IGetVolunteersRepository } from '../../repositories/interfaces';
import TGetVolunteersRequestDTO from './GetVolunteersRequestDTO';

class GetVolunteersUseCase {
    private getVolunteersRepository: IGetVolunteersRepository;

    constructor(getVolunteersRepository: IGetVolunteersRepository) {
        this.getVolunteersRepository = getVolunteersRepository;
    }

    async execute(getVolunteersRequestData: TGetVolunteersRequestDTO) {
        const { offset, limit } = getVolunteersRequestData;

        const volunteersListAndLastValueted =
            await this.getVolunteersRepository.getVolunteers(offset, limit);

        return volunteersListAndLastValueted;
    }
}

export default GetVolunteersUseCase;
