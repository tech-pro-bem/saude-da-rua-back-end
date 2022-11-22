import { randomUUID } from 'crypto';
import { InMemoryVolunteersRepository } from '../../src/modules/volunteers/repositories/implementations/inmemory/InMemoryVolunteersRepository';
import { IVolunteersRepository } from '../../src/modules/volunteers/repositories/IVolunteersRepository';
import {
    IUpdateCurrentlyParticipationUseCase,
    UpdateCurrentlyParticipationUseCase,
} from '../../src/modules/volunteers/useCases/updateCurrentlyParticipation/UpdateCurrentlyParticipationUseCase';
import { getRandomVolunteer } from '../helpers/GenerateDataForTests';
import { NotFoundError } from '../../src/helpers/errors';

let volunteersRepository: IVolunteersRepository;
let updateCurrentlyParticipationUseCase: IUpdateCurrentlyParticipationUseCase;
describe('UpdateCurrentlyParticipation', () => {
    beforeEach(() => {
        volunteersRepository = new InMemoryVolunteersRepository();
        updateCurrentlyParticipationUseCase =
            new UpdateCurrentlyParticipationUseCase(volunteersRepository);
    });

    it('should be able to update a volunteer currently participation', async () => {
        const volunteer = await getRandomVolunteer({
            repository: volunteersRepository,
        });

        await updateCurrentlyParticipationUseCase.execute({
            id: volunteer.id,
            currentlyParticipation: false,
        });

        const updatedVolunteer = await volunteersRepository.getVolunteer(
            volunteer.email
        );

        expect(updatedVolunteer.isCurrentlyParticipating).toEqual(false);
    });

    it("shouldn't be able to update a currently participation of a volunteer that doesn't exists", async () => {
        await expect(async () => {
            await updateCurrentlyParticipationUseCase.execute({
                id: randomUUID(),
                currentlyParticipation: false,
            });
        }).rejects.toEqual(new NotFoundError('Volunteer not found'));
    });
});
