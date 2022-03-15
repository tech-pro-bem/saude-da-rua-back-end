/* eslint-disable no-unused-vars */
export interface IPublishTopicToSendEmail {
    publishTopic(email: string): Promise<void>;
}
