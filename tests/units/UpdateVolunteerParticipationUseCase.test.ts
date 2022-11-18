import { InMemoryVolunteersRepository } from '../../src/modules/volunteers/repositories/implementations/inmemory/InMemoryVolunteersRepository';
import { IVolunteersRepository } from '../../src/modules/volunteers/repositories/IVolunteersRepository';
import {
    IUpdateVolunteerParticipationUseCase,
    UpdateVolunteerParticipationUseCase,
} from '../../src/modules/volunteers/useCases/updateVolunteerParticipation/UpdateVolunteerParticipationUseCase';
import { getRandomVolunteer } from '../helpers/GenerateDataForTests';

let volunteersRepository: IVolunteersRepository;
let updateVolunteerParticipationUseCase: IUpdateVolunteerParticipationUseCase;
describe('UpdateVolunteerParticipation', () => {
    beforeEach(() => {
        volunteersRepository = new InMemoryVolunteersRepository();
        updateVolunteerParticipationUseCase =
            new UpdateVolunteerParticipationUseCase(volunteersRepository);
    });

    it('should be able to update a volunteer participation', async () => {
        const volunteer = await getRandomVolunteer({
            repository: volunteersRepository,
        });

        await updateVolunteerParticipationUseCase.execute({
            id: volunteer.id,
            participation: 'PARTICIPATED',
        });

        const updatedVolunteer = await volunteersRepository.getVolunteer(
            volunteer.email
        );

        expect(updatedVolunteer.hasParticipated).toEqual('PARTICIPATED');
    });
});
