import { IBasicDisplayInstagramAPI } from '../../../../services/IBasicDisplayInstagramAPI';
import { InstagramToken } from '../../entities/InstagramToken';
import { IInstagramTokensRepository } from '../../repositories/IInstagramTokensRepository';

interface IRefreshLongLivedTokenUseCase {
    execute(): Promise<void>;
}

export class RefreshLongLivedTokenUseCase
    implements IRefreshLongLivedTokenUseCase
{
    constructor(
        private instagramTokensRepository: IInstagramTokensRepository,
        private basicDisplayInstagramAPI: IBasicDisplayInstagramAPI
    ) {}

    async execute(): Promise<void> {
        const instagramToken = await this.instagramTokensRepository.find();

        if (!instagramToken) return;

        const longLivedToken =
            await this.basicDisplayInstagramAPI.refreshLongLivedToken(
                instagramToken.longLivedToken
            );

        await this.instagramTokensRepository.save(
            new InstagramToken({ longLivedToken })
        );
    }
}
