import { PrismaVolunteersRepository } from "../../repositories/implementations/prisma/PrismaVolunteersRepository";
import CreateVolunteerUseCase from "./CreateVolunteerUseCase";
import { SNSVolunteersNotificationRepository } from "../../repositories/implementations/SNS/SNSVolunteersNotificationRepository";

const volunteersRepository = new PrismaVolunteersRepository();

const snsVolunteersNotificationRepository =
    new SNSVolunteersNotificationRepository();

const createVolunteerUseCase = new CreateVolunteerUseCase(
    volunteersRepository,
    snsVolunteersNotificationRepository
);

export { createVolunteerUseCase };
