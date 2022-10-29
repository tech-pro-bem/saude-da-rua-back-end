import { AuthenticationError } from '../../../../helpers/errors';
import { VerifyJWT } from '../../../../utils/auth';
import { IVolunteersRepository } from '../../repositories/IVolunteersRepository';
import { IVerifyVolunteerRequestEmailDTO } from './VerifyVolunteerEmailRequestDTO';

class VerifyVolunteerEmailUseCase {
    private volunteersRepository: IVolunteersRepository;

    constructor(volunteersRepository: IVolunteersRepository) {
        this.volunteersRepository = volunteersRepository;
    }

    async execute(verifyVolunteerEmailData: IVerifyVolunteerRequestEmailDTO) {
        const { token } = verifyVolunteerEmailData;

        let validateToken;

        try {
            const verifyJWT = new VerifyJWT(token);

            validateToken = verifyJWT.payloadFromCheckedToken();
        } catch (error) {
            throw new AuthenticationError('Verification time has expired');
        }

        const { email } = validateToken;

        await this.volunteersRepository.setVerifiedEmailToTrue(email);
    }
}

export default VerifyVolunteerEmailUseCase;
