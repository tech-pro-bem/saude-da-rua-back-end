import { APIGatewayProxyResult } from 'aws-lambda';
import { createMedicinesUseCase } from '../../../modules/medicines/useCases/createMedicines/index';
import { CreateMedicinesValidation } from '../../../utils/validations/medicineValidations/CreateMedicinesValidation';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const createMedicinesValidation = new CreateMedicinesValidation(event.body);

    const createMedicinesPayloadValidated =
        await createMedicinesValidation.validateInput();

    await createMedicinesUseCase.execute(createMedicinesPayloadValidated);

    return formatJSONResponse(
        {
            message: 'Successfully create medicine',
        },
        201
    );
};

export const main = middyfy(handler);
