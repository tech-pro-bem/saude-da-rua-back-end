import { APIGatewayProxyResult } from 'aws-lambda';
import { createMedicineUseCase } from '../../../modules/medicines/useCases/createMedicine/index';
import { CreateMedicineValidation } from '../../../utils/validations/medicineValidations/CreateMedicineValidation';
import { APIEventBodySchema, formatJSONResponse, middyfy } from '../middyfy';

const handler = async (
    event: APIEventBodySchema
): Promise<APIGatewayProxyResult> => {
    const createMedicineValidation = new CreateMedicineValidation(event.body);

    const createMedicinePayloadValidated =
        await createMedicineValidation.validateInput();

    await createMedicineUseCase.execute(createMedicinePayloadValidated);

    return formatJSONResponse(
        {
            message: 'Successfully create medicine',
        },
        201
    );
};

export const main = middyfy(handler);
