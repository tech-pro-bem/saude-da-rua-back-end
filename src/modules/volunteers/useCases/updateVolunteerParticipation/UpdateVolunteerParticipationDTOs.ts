import { constEnumType } from '../../../../utils/ConstEnumType';
import { participation } from '../../entities/Volunteer';

export type UpdateVolunteerParticipationRequest = {
    id: string;
    participation: constEnumType<typeof participation>;
};
