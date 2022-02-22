import { ValidationError } from '../../../helpers/errors';
import AdminValidationBase from './AdminValidationBase';

type BodyBeforeValidate = {
    [name: string]: any;
};

export class LoginAdminValidation extends AdminValidationBase {
    private body: BodyBeforeValidate;

    constructor(body: BodyBeforeValidate) {
        super();
        this.body = body;
    }

    public async validateInput() {
        try {
            const validatedPayload =
                await super.adminValidationBase.validateAsync(this.body);

            return validatedPayload;
        } catch (error) {
            const getDetailsError: string = error.details[0].message;
            const transformInFriendlyError = getDetailsError.replace(
                /"/g,
                '***'
            );

            throw new ValidationError(transformInFriendlyError);
        }
    }
}
