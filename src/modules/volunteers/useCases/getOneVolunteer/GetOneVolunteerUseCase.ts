import { Volunteer } from '../../entities/Volunteer';
import { IGetOneVolunteerRequestDTO } from './GetOneVolunteerRequestDTO';
import { IVolunteersRepository } from '../../repositories/IVolunteersRepository';
import { NotFoundError } from '../../../../helpers/errors';

class GetOneVolunteerUseCase {
    private volunteersRepository: IVolunteersRepository;

    constructor(volunteersRepository: IVolunteersRepository) {
        this.volunteersRepository = volunteersRepository;
    }

    async execute(
        getOneVolunteerRequestData: IGetOneVolunteerRequestDTO
    ): Promise<Volunteer> {
        const { id } = getOneVolunteerRequestData;

        const getOneVolunteerData: Volunteer =
            await this.volunteersRepository.getVolunteer(id);

        if (getOneVolunteerData === undefined) {
            throw new NotFoundError('There is no Voluntter with this email');
        }

        return getOneVolunteerData;
    }
}

export default GetOneVolunteerUseCase;
