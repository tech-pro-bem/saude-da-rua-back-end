import { NotFoundError } from '../../../../helpers/errors';
import { Volunteer } from '../../entities/Volunteer';
import { IVolunteersRepository } from '../../repositories/IVolunteersRepository';
import { UpdateVolunteerRequest } from './UpdateVolunteerDTOs';

export interface IUpdateVolunteerUseCase {
    execute(updateVolunteerRequest: UpdateVolunteerRequest): Promise<void>;
}

export class UpdateVolunteerUseCase implements IUpdateVolunteerUseCase {
    constructor(private volunteersRepository: IVolunteersRepository) {}

    async execute(
        updateVolunteerRequest: UpdateVolunteerRequest
    ): Promise<void> {
        const volunteerExists =
            await this.volunteersRepository.getVolunteerById(
                updateVolunteerRequest.id
            );

        if (!volunteerExists) throw new NotFoundError('Volunteer not found');

        await this.volunteersRepository.saveVolunteer(
            new Volunteer({ ...volunteerExists, ...updateVolunteerRequest })
        );
    }
}
