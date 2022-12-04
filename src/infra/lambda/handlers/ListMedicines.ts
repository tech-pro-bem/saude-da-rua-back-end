import { APIGatewayProxyResult } from 'aws-lambda';
import { listMedicinesUseCase } from '../../../modules/medicines/useCases/listMedicines';
import { formatJSONResponse, middyfy } from '../middyfy';

const handler = async (): Promise<APIGatewayProxyResult> => {
    const medicines = await listMedicinesUseCase.execute();

    return formatJSONResponse(medicines);
};

export const main = middyfy(handler);
