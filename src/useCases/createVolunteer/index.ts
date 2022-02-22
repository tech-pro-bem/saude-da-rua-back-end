import { CreateVolunteerDynamoRepository } from '../../repositories/implementations/DynamoDB';
import CreateVolunteerUseCase from './CreateVolunteerUseCase';

const createVolunteerDynamoRepository = new CreateVolunteerDynamoRepository();

const createVolunteerUseCase = new CreateVolunteerUseCase(
    createVolunteerDynamoRepository
);

export default createVolunteerUseCase;
