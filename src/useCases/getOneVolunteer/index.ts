import { GetOneVolunteerDynamoRepository } from '../../repositories/implementations/DynamoDB';
import GetOneVolunteerUseCase from './GetOneVolunteerUseCase';

const getOneVolunteerDynamoRepository = new GetOneVolunteerDynamoRepository();

const getVolunteersUseCase = new GetOneVolunteerUseCase(
    getOneVolunteerDynamoRepository
);

export default getVolunteersUseCase;
