import { AxiosBasicDisplayInstagramAPI } from '../../../../services/Axios/AxiosBasicDisplayInstagramAPI';
import { PrismaInstagramTokensRepository } from '../../repositories/implementations/prisma/PrismaInstagramTokensRepository';
import { RefreshLongLivedTokenUseCase } from './RefreshLongLivedTokenUseCase';

const axiosBasicDisplayInstagramAPI = new AxiosBasicDisplayInstagramAPI();
const prismaInstagramTokensRepository = new PrismaInstagramTokensRepository();

const refreshLongLivedTokenUseCase = new RefreshLongLivedTokenUseCase(
    prismaInstagramTokensRepository,
    axiosBasicDisplayInstagramAPI
);

export { refreshLongLivedTokenUseCase };
