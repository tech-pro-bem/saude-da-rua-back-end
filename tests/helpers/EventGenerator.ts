import { APIGatewayProxyEventV2WithRequestContext } from 'aws-lambda';

type EventBody = {
    [name: string]: any;
};

export class EventGeneratorFromGatewayV2 {
    private event: APIGatewayProxyEventV2WithRequestContext<any> = {
        version: '2.0',
        routeKey: 'POST /create/admin',
        rawPath: '/create/admin',
        rawQueryString: '',
        headers: {
            accept: '*/*',
        },
        requestContext: '',
        body: '',
        isBase64Encoded: false,
    };

    constructor(body: EventBody) {
        this.event.body = JSON.stringify(body);
    }

    public get getFullEvent() {
        return this.event;
    }
}
