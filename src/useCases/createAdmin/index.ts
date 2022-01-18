import DynamoAdminRepository from '../../repositories/implementations/DynamoDB/DynamoAdminRepository';

import CreateAdminUseCase from './CreateAdminUseCase';

const dynamoAdminRepository = new DynamoAdminRepository();

const createAdminUseCase = new CreateAdminUseCase(dynamoAdminRepository);

export default createAdminUseCase;
