import { randomUUID } from 'crypto';
import {
    IUpdateVolunteerUseCase,
    UpdateVolunteerUseCase,
} from '../../src/modules/volunteers/useCases/updateVolunteer/UpdateVolunteerUseCase';
import { InMemoryVolunteersRepository } from '../../src/modules/volunteers/repositories/implementations/inmemory/InMemoryVolunteersRepository';
import { IVolunteersRepository } from '../../src/modules/volunteers/repositories/IVolunteersRepository';
import { getRandomVolunteer } from '../helpers/GenerateDataForTests';
import { NotFoundError } from '../../src/helpers/errors';

let volunteersRepository: IVolunteersRepository;
let updateVolunteerUseCase: IUpdateVolunteerUseCase;
describe('UpdateVolunteer', () => {
    beforeEach(() => {
        volunteersRepository = new InMemoryVolunteersRepository();
        updateVolunteerUseCase = new UpdateVolunteerUseCase(
            volunteersRepository
        );
    });

    it('should be able to update a volunteer', async () => {
        const volunteer = await getRandomVolunteer({
            repository: volunteersRepository,
        });

        await updateVolunteerUseCase.execute({
            id: volunteer.id,
            fullName: 'test test',
            email: 'test@test.com',
        });

        const updatedVolunteer = await volunteersRepository.getVolunteer(
            'test@test.com'
        );

        expect(updatedVolunteer).not.toBeNull();
        expect(updatedVolunteer.fullName).toEqual('test test');
        expect(updatedVolunteer.email).toEqual('test@test.com');
    });

    it("shouldn't be able to update a volunteer that doesn't exists", async () => {
        await expect(async () => {
            await updateVolunteerUseCase.execute({
                id: randomUUID(),
            });
        }).rejects.toEqual(new NotFoundError('Volunteer not found'));
    });
});
