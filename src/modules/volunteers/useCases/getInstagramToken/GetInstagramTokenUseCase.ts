import { GetInstagramTokenResponseDTO } from './GetInstagramTokenDTO';

export interface IGetInstagramTokenUseCase {
    execute(): GetInstagramTokenResponseDTO;
}

class GetInstagramTokenUseCase implements IGetInstagramTokenUseCase {
    execute(): GetInstagramTokenResponseDTO {
        return {
            itoken: process.env.INSTAGRAM_TOKEN,
        };
    }
}

export default GetInstagramTokenUseCase;
