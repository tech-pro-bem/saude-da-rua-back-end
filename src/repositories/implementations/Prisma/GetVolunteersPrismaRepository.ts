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
        const listOfVolunteers = await this.prisma.volunteer.findMany({
            take: limit,
            cursor: lastVolunteerId ? { id: lastVolunteerId } : undefined,
            where: {
                email: {
                    contains: '@',
                },
            },
        });

        const volunteers = listOfVolunteers.map(
            (volunteer) => new Volunteer(volunteer)
        );

        return {
            volunteers: volunteers.filter(
                (volunteer) => volunteer.id !== lastVolunteerId
            ),
        };
    }
}
