import DeleteAdminDynamoRepository from '../../repositories/implementations/DynamoDB/DeleteAdminDynamoRepository';
import DeleteAdminUseCase from './DeleteAdminUseCase';

const deleteAdminDynamoRepository = new DeleteAdminDynamoRepository();

const deleteAdminUseCase = new DeleteAdminUseCase(deleteAdminDynamoRepository);

export default deleteAdminUseCase;