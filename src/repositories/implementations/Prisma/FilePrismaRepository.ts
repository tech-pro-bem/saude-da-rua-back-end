import { PrismaClient } from '@prisma/client';
import { File } from '../../../entities/File';
import { PrismaPostgresClient } from '../../../helpers/database/PrismaPostgresClient';
import {
    ICreateFileRepository,
    IDeleteFileRepository,
    IListFileRepository,
    ListFilesParams,
} from '../../interfaces';

export class FilePrismaRepository
    extends PrismaPostgresClient
    implements
        ICreateFileRepository,
        IDeleteFileRepository,
        IListFileRepository
{
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = super.getPrismaClient();
    }

    async listFiles({
        type,
        lastFileId,
        limit,
    }: ListFilesParams): Promise<File[]> {
        const files = await this.prisma.file.findMany({
            take: limit,
            cursor: lastFileId ? { id: lastFileId } : undefined,
            where: { fileType: type },
        });

        return files.map((file) => new File(file));
    }

    async deleteFile(id: string): Promise<void> {
        await this.prisma.file.delete({ where: { id } });
    }

    async createFile(file: File): Promise<void> {
        await this.prisma.file.create({ data: file });
    }
}
