import CreateVolunteerUseCase from './CreateVolunteerUseCase';
import { PublishTopicSendEmail } from '../../repositories/implementations/SNS';
import { CreateVolunteerPrismaRepository } from '../../repositories/implementations/Prisma/CreateVolunteerPrismaRepository';

// const createVolunteerDynamoRepository = new CreateVolunteerDynamoRepository();
const createVolunteerPrismaRepository = new CreateVolunteerPrismaRepository();

const publishTopicSendEmail = new PublishTopicSendEmail();

const createVolunteerUseCase = new CreateVolunteerUseCase(
    createVolunteerPrismaRepository,
    publishTopicSendEmail
);

export default createVolunteerUseCase;
