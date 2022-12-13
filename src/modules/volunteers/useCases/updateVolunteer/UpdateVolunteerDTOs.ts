import { Volunteer } from '../../entities/Volunteer';
import { ICreateVolunteerRequestDTO } from '../createVolunteer/CreateVolunteerRequestDTO';

export type UpdateVolunteerRequest = Partial<Volunteer>;
