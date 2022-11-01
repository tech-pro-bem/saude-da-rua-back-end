import { SNSEvent, Context, Callback } from 'aws-lambda';
import { sendEmailToVolunteerUseCase } from '../../../modules/volunteers/useCases/sendEmailToVolunteer';

export const handler = async (
    event: SNSEvent,
    context: Context,
    callback: Callback
): Promise<any> => {
    const sendEmailTo = event.Records[0].Sns.Message;

    try {
        await sendEmailToVolunteerUseCase.execute(sendEmailTo);
    } catch (error) {
        callback(error);
    }

    callback(null, {
        message: `SNS lamdba was triggered and send email to ${sendEmailTo}`,
        event,
    });
};
