import { PrismaInstagramTokensRepository } from '../../repositories/implementations/prisma/PrismaInstagramTokensRepository';
import { AxiosBasicDisplayInstagramAPI } from '../../../../services/Axios/AxiosBasicDisplayInstagramAPI';
import { GetLongLivedTokenUseCase } from './GetLongLivedTokenUseCase';

const axiosBasicDisplayInstagramAPI = new AxiosBasicDisplayInstagramAPI();
const prismaInstagramTokensRepository = new PrismaInstagramTokensRepository();
const getLongLivedTokenUseCase = new GetLongLivedTokenUseCase(
    axiosBasicDisplayInstagramAPI,
    prismaInstagramTokensRepository
);

export { getLongLivedTokenUseCase };
