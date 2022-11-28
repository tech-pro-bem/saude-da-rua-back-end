import { NotFoundError } from '../../../../helpers/errors';
import { IVolunteersRepository } from '../../repositories/IVolunteersRepository';
import { DeleteVolunteerRequestDTO } from './DeleteVolunteerDTOs';

interface IDeleteVolunteerUseCase {
    execute({ id }: DeleteVolunteerRequestDTO): Promise<void>;
}

export class DeleteVolunteerUseCase implements IDeleteVolunteerUseCase {
    constructor(private volunteersRepository: IVolunteersRepository) {}

    async execute({ id }: DeleteVolunteerRequestDTO): Promise<void> {
        const volunteerExists =
            await this.volunteersRepository.getVolunteerById(id);

        if (!volunteerExists) throw new NotFoundError('Volunteer not found');

        await this.volunteersRepository.deleteById(id);
    }
}
