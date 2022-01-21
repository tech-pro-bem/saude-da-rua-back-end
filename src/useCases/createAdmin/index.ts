import CreateAdminDynamoRepository from '../../repositories/implementations/DynamoDB/CreateAdminDynamoRepository';
import CreateAdminUseCase from './CreateAdminUseCase';

const createAdminDynamoRepository = new CreateAdminDynamoRepository();

const createAdminUseCase = new CreateAdminUseCase(createAdminDynamoRepository);

export default createAdminUseCase;
