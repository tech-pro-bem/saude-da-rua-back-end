import LoginAdminDynamoRepository from '../../repositories/implementations/DynamoDB/LoginAdminDynamoRepository';
import LoginAdminUseCase from './LoginAdminUseCase';

const loginAdminDynamoRepository = new LoginAdminDynamoRepository();

const loginAdminUseCase = new LoginAdminUseCase(loginAdminDynamoRepository);

export default loginAdminUseCase;
