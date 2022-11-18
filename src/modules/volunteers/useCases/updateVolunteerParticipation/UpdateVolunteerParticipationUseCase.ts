import { IVolunteersRepository } from '../../repositories/IVolunteersRepository';
import { UpdateVolunteerParticipationRequest } from './UpdateVolunteerParticipationDTOs';

export interface IUpdateVolunteerParticipationUseCase {
    execute(
        updateVolunteerParticipationRequest: UpdateVolunteerParticipationRequest
    ): Promise<void>;
}

export class UpdateVolunteerParticipationUseCase
    implements IUpdateVolunteerParticipationUseCase
{
    constructor(private volunteersRepository: IVolunteersRepository) {}

    async execute(
        updateVolunteerParticipationRequest: UpdateVolunteerParticipationRequest
    ): Promise<void> {
        await this.volunteersRepository.updateVolunteerParticipation(
            updateVolunteerParticipationRequest
        );
    }
}
