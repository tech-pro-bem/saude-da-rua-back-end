import { FileDynamoRepository } from '../../repositories/implementations/DynamoDB';
import { ListFilesUseCase } from './ListFilesUseCase';

const listFilesDynamoRepository = new FileDynamoRepository();

const listFilesUseCase = new ListFilesUseCase(listFilesDynamoRepository);

export default listFilesUseCase;
