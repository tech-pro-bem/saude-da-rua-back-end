/* eslint-disable prettier/prettier */
import { Volunteer } from '../../entities/Volunteer';

type TUpdateVolunteerRequestDTO = { partialVolunteer: Partial<Volunteer> }

export default TUpdateVolunteerRequestDTO
