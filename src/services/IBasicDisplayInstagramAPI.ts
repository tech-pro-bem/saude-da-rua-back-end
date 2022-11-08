export interface IBasicDisplayInstagramAPI {
    getAccessToken(code: string): Promise<string>;
    getLongLivedToken(accessToken: string): Promise<string>;
    refreshLongLivedToken(longLivedToken: string): Promise<string>;
}
