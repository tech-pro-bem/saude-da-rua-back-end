import { randomUUID } from 'crypto';
import { NotFoundError } from '@prisma/client/runtime';
import { IVolunteersRepository } from '../../src/modules/volunteers/repositories/IVolunteersRepository';
import { DeleteVolunteerUseCase } from '../../src/modules/volunteers/useCases/deleteVolunteer/DeleteVolunteerUseCase';
import { InMemoryVolunteersRepository } from '../../src/modules/volunteers/repositories/implementations/inmemory/InMemoryVolunteersRepository';
import { getRandomVolunteer } from '../helpers/GenerateDataForTests';

let volunteersRepository: IVolunteersRepository;
let deleteVolunteerUseCase: DeleteVolunteerUseCase;
describe('DeleteVolunteerUseCase', () => {
    beforeEach(() => {
        volunteersRepository = new InMemoryVolunteersRepository();
        deleteVolunteerUseCase = new DeleteVolunteerUseCase(
            volunteersRepository
        );
    });

    it('should be able to delete a volunteer', async () => {
        const volunteer = await getRandomVolunteer({
            repository: volunteersRepository,
        });

        await deleteVolunteerUseCase.execute({ id: volunteer.id });

        const volunteerExists = await volunteersRepository.getVolunteerById(
            volunteer.id
        );

        expect(volunteerExists).toBeNull();
    });

    it("shouldn't be able to delete a non-existent volunteer", async () => {
        await expect(async () => {
            await deleteVolunteerUseCase.execute({ id: randomUUID() });
        }).rejects.toEqual(new NotFoundError('Volunteer not found'));
    });
});
