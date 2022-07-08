import { ListFilesInfoDynamoRepository } from '../../repositories/implementations/DynamoDB';
import { ListFilesUseCase } from './ListFilesUseCase';

const listFilesDynamoRepository = new ListFilesInfoDynamoRepository();

const listFilesUseCase = new ListFilesUseCase(listFilesDynamoRepository);

export default listFilesUseCase;
