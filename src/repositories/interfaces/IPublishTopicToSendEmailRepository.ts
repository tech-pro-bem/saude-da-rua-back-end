/* eslint-disable no-unused-vars */
export interface IPublishTopicToSendEmailRepository {
    publishTopic(email: string): Promise<void>;
}
