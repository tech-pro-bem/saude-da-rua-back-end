import { PrismaClient } from '@prisma/client';
import { Volunteer } from '../../../entities/Volunteer';
import { PrismaPostgresClient } from '../../../helpers/database/PrismaPostgresClient';
import {
    IGetVolunteersRepository,
    RequestGetVolunteers,
    ResponseGetVolunteers,
} from '../../interfaces';

export class GetVolunteersPrismaRepository
    extends PrismaPostgresClient
    implements IGetVolunteersRepository
{
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = super.getPrismaClient();
    }

    async getVolunteers({
        limit,
        lastVolunteerId,
    }: RequestGetVolunteers): Promise<ResponseGetVolunteers> {
        const listOfVolunteers = (await this.prisma.volunteer.findMany({
            take: limit,
            cursor: {
                id: lastVolunteerId,
            },
            where: {
                email: {
                    contains: '@',
                },
            },
        })) as Volunteer[];

        const lastVolunteerInSearch = listOfVolunteers[limit - 1];

        return {
            id: lastVolunteerInSearch.id,
            volunteers: listOfVolunteers,
        };
    }
}
