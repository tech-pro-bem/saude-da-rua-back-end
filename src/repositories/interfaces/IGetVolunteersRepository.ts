/* eslint-disable no-unused-vars */
import { Volunteer } from '../../entities/Volunteer';

type TLastEvaluatedKey = {
    email: string;
};

export interface IGetVolunteersRepository {
    getVolunteers(
        offset: string | null,
        limit: number
    ): Promise<[TLastEvaluatedKey | null, Volunteer[]]>;
}
