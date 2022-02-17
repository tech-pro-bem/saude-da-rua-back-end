import { LoginAdminDynamoRepository } from '../../repositories/implementations/DynamoDB';
import LoginAdminUseCase from './LoginAdminUseCase';

const loginAdminDynamoRepository = new LoginAdminDynamoRepository();

const loginAdminUseCase = new LoginAdminUseCase(loginAdminDynamoRepository);

export default loginAdminUseCase;
