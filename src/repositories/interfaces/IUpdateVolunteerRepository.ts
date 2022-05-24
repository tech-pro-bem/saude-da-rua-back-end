/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { AWSError } from 'aws-sdk';
import { Volunteer } from '../../entities/Volunteer';

export interface IUpdateVolunteerRepository {
    updateVolunteer(partialVolunteer: Partial<Volunteer>): Promise<Volunteer | AWSError>;
}
