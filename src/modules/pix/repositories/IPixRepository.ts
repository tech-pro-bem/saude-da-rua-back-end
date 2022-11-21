import { Pix } from '../entities/InstagramToken';

export interface IPixRepository {
    save(pix: Pix): Promise<Pix>;
    find(): Promise<Pix | null>;
}
