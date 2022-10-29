/* eslint-disable @typescript-eslint/no-var-requires */
const {
    handler,
} = require('./.esbuild/.build/src/infra/lambda/handlers/AuthenticateAdminProxy.js'); // I know what you're thinking, don't judge me pls

const mylocalAuthProxyFn = async (event, context) => {
    const result = await handler(event, context, (err) => {
        if (err) throw err;
    });

    result.policyDocument.Statement[0].Resource = '*';
    return result;
};

module.exports = { mylocalAuthProxyFn };
