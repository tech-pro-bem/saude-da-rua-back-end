import { VerifyVolunteerEmailDynamoRepository } from '../../repositories/implementations/DynamoDB';
import VerifyVolunteerEmailUseCase from './VerifyVolunteerEmailUseCase';

const verifyVolunteerEmailDynamoRepository =
    new VerifyVolunteerEmailDynamoRepository();

const verifyVolunteerEmailUseCase = new VerifyVolunteerEmailUseCase(
    verifyVolunteerEmailDynamoRepository
);

export default verifyVolunteerEmailUseCase;
