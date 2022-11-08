import axios from 'axios';
import FormData from 'form-data';
import { IBasicDisplayInstagramAPI } from '../IBasicDisplayInstagramAPI';

export class AxiosBasicDisplayInstagramAPI
    implements IBasicDisplayInstagramAPI
{
    async refreshLongLivedToken(longLivedToken: string): Promise<string> {
        const { data } = await this.graphClient.get('/refresh_access_token', {
            params: {
                grant_type: 'ig_refresh_token',
                access_token: longLivedToken,
            },
        });

        return data.access_token;
    }

    private client = axios.create({ baseURL: 'https://api.instagram.com' });

    private graphClient = axios.create({
        baseURL: 'https://graph.instagram.com',
    });

    async getAccessToken(code: string): Promise<string> {
        const form = new FormData();
        form.append('client_id', process.env.INSTAGRAM_APP_ID);
        form.append('client_secret', process.env.INSTAGRAM_APP_SECRET);
        form.append('code', code);
        form.append('grant_type', 'authorization_code');
        form.append('redirect_uri', process.env.INSTAGRAM_APP_REDIRECT_URI);
        const { data } = await this.client.post('/oauth/access_token', form, {
            headers: form.getHeaders(),
        });

        return data.access_token;
    }

    async getLongLivedToken(accessToken: string): Promise<string> {
        const { data } = await this.graphClient.get('/access_token', {
            params: {
                access_token: accessToken,
                grant_type: 'ig_exchange_token',
                client_secret: process.env.INSTAGRAM_APP_SECRET,
            },
        });

        return data.access_token;
    }
}
