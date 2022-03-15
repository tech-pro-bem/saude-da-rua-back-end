import SNS, { PublishInput } from 'aws-sdk/clients/sns';
import { IPublishTopicToSendEmail } from '../../interfaces';

export class PublishTopicSendEmail implements IPublishTopicToSendEmail {
    private topicArn = `arn:aws:sns:${process.env.region}:${process.env.ACCOUNT_ID}:${process.env.SEND_EMAIL_TOPIC_NAME}`;

    public async publishTopic(email: string): Promise<void> {
        const topicParams: PublishInput = {
            Message: email,
            TopicArn: this.topicArn,
        };

        await new SNS().publish(topicParams).promise();
    }
}
