import { Volunteer } from '../../entities/Volunteer';
import { IGetOneVolunteerRepository } from '../../repositories/interfaces';
import TGetOneVolunteerRequestDTO from './GetOneVolunteerRequestDTO';
import { NotFoundError } from '../../helpers/errors';

class GetOneVolunteerUseCase {
    private getOneVolunteerRepository: IGetOneVolunteerRepository;

    constructor(getOneVolunteerRepository: IGetOneVolunteerRepository) {
        this.getOneVolunteerRepository = getOneVolunteerRepository;
    }

    async execute(
        getOneVolunteerRequestData: TGetOneVolunteerRequestDTO
    ): Promise<Volunteer> {
        const { email } = getOneVolunteerRequestData;

        const getOneVolunteerData: Volunteer =
            await this.getOneVolunteerRepository.getVolunteer(email);

        if (getOneVolunteerData === undefined) {
            throw new NotFoundError('There is no Voluntter with this email');
        }

        return getOneVolunteerData;
    }
}

export default GetOneVolunteerUseCase;
