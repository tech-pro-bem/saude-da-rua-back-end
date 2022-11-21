import { Pix } from '../entities/InstagramToken';

export interface IPixRepository {
    save(instagramToken: Pix): Promise<Pix>;
    find(): Promise<Pix | null>;
}
