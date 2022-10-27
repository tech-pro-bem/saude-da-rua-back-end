
import { TGetInstagramTokenResponseDTO } from './GetInstagramTokenDTO';

export interface IGetInstagramTokenUseCase {
    execute(): TGetInstagramTokenResponseDTO
}

class GetInstagramTokenUseCase implements IGetInstagramTokenUseCase {
    execute(): TGetInstagramTokenResponseDTO {
       return {
            itoken: process.env["INSTAGRAM_TOKEN"]
       }
    }
}

export default GetInstagramTokenUseCase;
