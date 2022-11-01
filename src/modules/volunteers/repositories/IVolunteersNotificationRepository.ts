export interface IVolunteersNotificationRepository {
    publishNewVolunteer(email: string): Promise<void>;
}
