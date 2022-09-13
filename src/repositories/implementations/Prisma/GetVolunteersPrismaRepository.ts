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
        offset,
        limit,
        lastVolunteerId,
    }: RequestGetVolunteers): Promise<ResponseGetVolunteers> {
        const partOfVolunteers = (await this.prisma.volunteer.findMany({
            take: limit,
            skip: offset,
            cursor: {
                id: lastVolunteerId,
            },
            where: {
                email: {
                    contains: '.com',
                },
            },
        })) as Volunteer[];

        const lastVolunterInResults = partOfVolunteers[offset - 1];

        const content: ResponseGetVolunteers = {
            id: lastVolunterInResults.id,
            volunteers: partOfVolunteers,
        };

        return content;
    }
}
