import { IVerifyVolunteerEmailRepository } from '../../repositories/interfaces';
import { VerifyJWT } from '../../utils/auth';
import { AuthenticationError } from '../../helpers/errors';
import TVerifyVolunteerRequestEmailDTO from './VerifyVolunteerEmailRequestDTO';

class VerifyVolunteerEmailUseCase {
    private verifyVolunteerEmailRepository: IVerifyVolunteerEmailRepository;

    constructor(verifyVolunteerRepository: IVerifyVolunteerEmailRepository) {
        this.verifyVolunteerEmailRepository = verifyVolunteerRepository;
    }

    async execute(verifyVolunteerEmailData: TVerifyVolunteerRequestEmailDTO) {
        const { token } = verifyVolunteerEmailData;

        let validateToken;

        try {
            const verifyJWT = new VerifyJWT(token);

            validateToken = verifyJWT.payloadFromCheckedToken();
        } catch (error) {
            throw new AuthenticationError('Verification time has expired');
        }

        const { email } = validateToken;

        await this.verifyVolunteerEmailRepository.setVerifiedEmailToTrue(email);
    }
}

export default VerifyVolunteerEmailUseCase;
