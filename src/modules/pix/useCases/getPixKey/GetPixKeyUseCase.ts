import { IPixRepository } from '../../repositories/IPixRepository';
import { GetPixKeyResponseDTO } from './GetPixKeyDTO';

export interface IGetPixKeyUseCase {
    execute(): Promise<GetPixKeyResponseDTO>;
}

class GetPixKeyUseCase implements IGetPixKeyUseCase {
    constructor(
        private pixRepository: IPixRepository
    ) {}

    async execute(): Promise<GetPixKeyResponseDTO> {
        const pixKey = await this.pixRepository.find();

        return {
            key: pixKey.key,
        };
    }
}

export { GetPixKeyUseCase };
