import { APIGatewayProxyResult } from 'aws-lambda';
import { ListMedicinesValidation } from '../../../utils/validations/medicineValidations/ListMedicinesValidation';
import { listMedicinesUseCase } from '../../../modules/medicines/useCases/listMedicines';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const listMedicinesValidation = new ListMedicinesValidation(
        event.queryStringParameters
    );

    const listMedicinesPayload = await listMedicinesValidation.validate();

    const medicines = await listMedicinesUseCase.execute(listMedicinesPayload);

    return formatJSONResponse(medicines);
};

export const main = middyfy(handler);
