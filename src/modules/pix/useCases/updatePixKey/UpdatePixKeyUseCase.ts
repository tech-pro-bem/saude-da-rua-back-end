import { UpdatePixKeyDTO } from './UpdatePixKeyDTO';
import { IPixRepository } from '../../repositories/IPixRepository';
import { Pix } from '../../entities/Pix'

export class UpdatePixUseCase {
    constructor(private pixRepository: IPixRepository) {}

    public async execute(params: UpdatePixKeyDTO.Params): Promise<void> {
        const pix = new Pix({
            key: params.key
        })

        await this.pixRepository.save(pix);
    }
}
