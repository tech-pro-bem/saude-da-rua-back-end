/* eslint-disable no-unused-vars */
export interface IVerifyVolunteerEmailRepository {
    setVerifiedEmailToTrue(email: string): Promise<void>;
}
