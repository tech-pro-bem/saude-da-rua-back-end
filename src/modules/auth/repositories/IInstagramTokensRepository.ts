import { InstagramToken } from '../entities/InstagramToken';

export interface IInstagramTokensRepository {
    save(instagramToken: InstagramToken): Promise<InstagramToken>;
    find(): Promise<InstagramToken | null>;
}
