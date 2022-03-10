import { GetVolunteersDynamoRepository } from '../../repositories/implementations/DynamoDB';
import GetVolunteersUseCase from './GetVolunteersUseCase';

const getVolunteersDynamoRepository = new GetVolunteersDynamoRepository();

const getVolunteersUseCase = new GetVolunteersUseCase(
    getVolunteersDynamoRepository
);

export default getVolunteersUseCase;
