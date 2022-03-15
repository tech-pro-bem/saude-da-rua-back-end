import { CreateVolunteerDynamoRepository } from '../../repositories/implementations/DynamoDB';
import CreateVolunteerUseCase from './CreateVolunteerUseCase';
import { PublishTopicSendEmail } from '../../repositories/implementations/SNS';

const createVolunteerDynamoRepository = new CreateVolunteerDynamoRepository();

const publishTopicSendEmail = new PublishTopicSendEmail();

const createVolunteerUseCase = new CreateVolunteerUseCase(
    createVolunteerDynamoRepository,
    publishTopicSendEmail
);

export default createVolunteerUseCase;
