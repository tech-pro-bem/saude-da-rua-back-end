import { NotFoundError } from '../../../../helpers/errors';
import { IVolunteersRepository } from '../../repositories/IVolunteersRepository';
import { UpdateCurrentlyParticipationRequest } from './UpdateCurrentlyParticipationDTOs';

export interface IUpdateCurrentlyParticipationUseCase {
    execute(
        updateCurrentlyParticipationRequest: UpdateCurrentlyParticipationRequest
    ): Promise<void>;
}

export class UpdateCurrentlyParticipationUseCase
    implements IUpdateCurrentlyParticipationUseCase
{
    constructor(private volunteersRepository: IVolunteersRepository) {}

    async execute(
        updateCurrentlyParticipationRequest: UpdateCurrentlyParticipationRequest
    ): Promise<void> {
        const volunteerExists =
            await this.volunteersRepository.getVolunteerById(
                updateCurrentlyParticipationRequest.id
            );

        if (!volunteerExists) throw new NotFoundError('Volunteer not found');

        await this.volunteersRepository.updateCurrentlyParticipation(
            updateCurrentlyParticipationRequest
        );
    }
}
