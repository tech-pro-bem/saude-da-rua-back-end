import { IInstagramTokensRepository } from '../../repositories/IInstagramTokensRepository';
import { GetInstagramTokenResponseDTO } from './GetInstagramTokenDTO';

export interface IGetInstagramTokenUseCase {
    execute(): Promise<GetInstagramTokenResponseDTO>;
}

class GetInstagramTokenUseCase implements IGetInstagramTokenUseCase {
    constructor(
        private instagramTokensRepository: IInstagramTokensRepository
    ) {}

    async execute(): Promise<GetInstagramTokenResponseDTO> {
        const instagramToken = await this.instagramTokensRepository.find();

        return {
            token: instagramToken.longLivedToken,
        };
    }
}

export { GetInstagramTokenUseCase };
