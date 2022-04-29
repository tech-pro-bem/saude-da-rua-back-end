import { UpdateVolunteerDynamoRepository } from '../../repositories/implementations/DynamoDB';
import UpdateVolunteerUseCase from './UpdateVolunteerUseCase';


const UpdateVolunteerRepository = new UpdateVolunteerDynamoRepository();

const VolunteerUseCase = new UpdateVolunteerUseCase(UpdateVolunteerRepository);

export default VolunteerUseCase;
