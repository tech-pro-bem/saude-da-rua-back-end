import { PrismaClient } from '@prisma/client';
import { PrismaPostgresClient } from '../../../../../helpers/database/PrismaPostgresClient';
import { IFilesRepository, ListFilesInput } from '../../IFilesRepository';
import { File } from '../../../entities/File';

export class PrismaFilesRepository
    extends PrismaPostgresClient
    implements IFilesRepository
{
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = super.getPrismaClient();
    }

    async createFile(file: File): Promise<void> {
        await this.prisma.file.create({ data: file });
    }

    async deleteFile(id: string): Promise<void> {
        await this.prisma.file.delete({ where: { id } });
    }

    async listFiles({
        limit,
        lastFileId,
        type,
    }: ListFilesInput): Promise<File[]> {
        const files = await this.prisma.file.findMany({
            take: limit,
            cursor: lastFileId ? { id: lastFileId } : undefined,
            where: { fileType: type },
        });

        return files.map((file) => new File(file));
    }
}
