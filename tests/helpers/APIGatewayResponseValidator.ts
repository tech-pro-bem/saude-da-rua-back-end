type Response = {
    [name: string]: any;
};

function isCorrectHeaders(headers: string) {
    if (headers['content-type'] !== 'application/json') return false;

    return true;
}

export function isApiGatewayResponse(response: Response) {
    const { statusCode, headers, body } = response;

    if (!body || !headers || !statusCode) return false;
    if (typeof statusCode !== 'number') return false;
    if (typeof body !== 'string') return false;
    if (!isCorrectHeaders(headers)) return false;

    return true;
}
