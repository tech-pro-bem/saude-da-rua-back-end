import { GetLongLivedTokenDTO } from './GetLongLivedTokenDTOs';
import { IBasicDisplayInstagramAPI } from '../../../../services/IBasicDisplayInstagramAPI';
import { IInstagramTokensRepository } from '../../repositories/IInstagramTokensRepository';
import { InstagramToken } from '../../entities/InstagramToken';
import { AuthenticationError } from '../../../../helpers/errors';

interface IGetLongLivedTokenUseCase {
    execute({ code }: GetLongLivedTokenDTO): Promise<void>;
}

export class GetLongLivedTokenUseCase implements IGetLongLivedTokenUseCase {
    constructor(
        private basicDisplayInstagramAPI: IBasicDisplayInstagramAPI,
        private instagramTokensRepository: IInstagramTokensRepository
    ) {}

    async execute({ code }: GetLongLivedTokenDTO): Promise<void> {
        const accessToken = await this.basicDisplayInstagramAPI.getAccessToken(
            code
        );

        const longLivedToken =
            await this.basicDisplayInstagramAPI.getLongLivedToken(accessToken);

        await this.instagramTokensRepository.save(
            new InstagramToken({ longLivedToken })
        );
    }
}
