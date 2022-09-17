/* eslint-disable no-unused-vars */
import { Volunteer } from '../../entities/Volunteer';

export type RequestGetVolunteers = {
    offset: number | null;
    limit: number;
    lastVolunteerId: string | null;
};

export type ResponseGetVolunteers = {
    id: string | null;
    volunteers: Volunteer[];
};

export interface IGetVolunteersRepository {
    getVolunteers({
        limit,
        lastVolunteerId,
    }: RequestGetVolunteers): Promise<ResponseGetVolunteers>;
}
