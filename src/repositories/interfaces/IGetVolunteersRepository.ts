/* eslint-disable no-unused-vars */
import { Volunteer } from '../../entities/Volunteer';

export type RequestGetVolunteers = {
    limit: number;
    lastVolunteerId: string | null;
};

export type ResponseGetVolunteers = {
    volunteers: Volunteer[];
};

export interface IGetVolunteersRepository {
    getVolunteers({
        limit,
        lastVolunteerId,
    }: RequestGetVolunteers): Promise<ResponseGetVolunteers>;
}
