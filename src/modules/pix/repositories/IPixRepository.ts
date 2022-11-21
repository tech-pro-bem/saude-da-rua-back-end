import { Pix } from '../entities/Pix';

export interface IPixRepository {
    save(pix: Pix): Promise<Pix>;
    find(): Promise<Pix | null>;
}
