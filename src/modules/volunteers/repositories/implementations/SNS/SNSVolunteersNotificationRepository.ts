import SNS, { PublishInput } from "aws-sdk/clients/sns";
import { IVolunteersNotificationRepository } from "../../IVolunteersNotificationRepository";

export class SNSVolunteersNotificationRepository
    implements IVolunteersNotificationRepository
{
    private topicArn = `arn:aws:sns:${process.env.region}:${process.env.ACCOUNT_ID}:${process.env.SEND_EMAIL_TOPIC_NAME}`;

    async publishNewVolunteer(email: string): Promise<void> {
        const topicParams: PublishInput = {
            Message: email,
            TopicArn: this.topicArn,
        };

        await new SNS().publish(topicParams).promise();
    }
}
