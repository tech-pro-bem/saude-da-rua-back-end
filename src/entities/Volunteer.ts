/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from 'uuid';
import { constEnumType } from '../utils/ConstEnumType';

const occupation: {
    [x: string]: 'MEDICO' | 'ENFERMEIRO' | 'FARMACEUTICO' | 'ESTUDANTE';
} = {
    MEDICO: 'MEDICO',
    ENFERMEIRO: 'ENFERMEIRO',
    FARMACEUTICO: 'FARMACEUTICO',
    ESTUDANTE: 'ESTUDANTE',
};

const semester: {
    [x: string]:
        | 'FIRST'
        | 'SECOND'
        | 'THIRD'
        | 'FOURTH'
        | 'FIFTH'
        | 'SIXTH'
        | 'SEVENTH'
        | 'EIGHTH'
        | 'NINTH'
        | 'TENTH'
        | 'MORE';
} = {
    FIRST: 'FIRST',
    SECOND: 'SECOND',
    THIRD: 'THIRD',
    FOURTH: 'FOURTH',
    FIFTH: 'FIFTH',
    SIXTH: 'SIXTH',
    SEVENTH: 'SEVENTH',
    EIGHTH: 'EIGHTH',
    NINTH: 'NINTH',
    TENTH: 'TENTH',
    MORE: 'MORE',
};

const freeDaysOfWeek: {
    [x: string]:
        | 'DOMINGO'
        | 'SEGUNDA'
        | 'TERCA'
        | 'QUARTA'
        | 'QUINTA'
        | 'SEXTA'
        | 'SABADO';
} = {
    DOMINGO: 'DOMINGO',
    SEGUNDA: 'SEGUNDA',
    TERCA: 'TERCA',
    QUARTA: 'QUARTA',
    QUINTA: 'QUINTA',
    SEXTA: 'SEXTA',
    SABADO: 'SABADO',
};

const howMuchParticipate: {
    [x: string]:
        | 'NOT_PARTICIPATED'
        | 'ONE_PARTICIPATION'
        | 'BETWEEN_TWO_AND_FIVE_PARTICIPATION'
        | 'MORE_THAN_FIVE_PARTICIPATION';
} = {
    NOT_PARTICIPATED: 'NOT_PARTICIPATED',
    ONE_PARTICIPATION: 'ONE_PARTICIPATION',
    BETWEEN_TWO_AND_FIVE_PARTICIPATION: 'BETWEEN_TWO_AND_FIVE_PARTICIPATION',
    MORE_THAN_FIVE_PARTICIPATION: 'MORE_THAN_FIVE_PARTICIPATION',
};

const howDidKnowOfSDR: {
    [x: string]:
        | 'SITE'
        | 'INSTAGRAM'
        | 'POSTS'
        | 'EDUCATIONAL_INSTITUTIONS'
        | 'OTHER';
} = {
    SITE: 'SITE',
    INSTAGRAM: 'INSTAGRAM',
    POSTS: 'POSTS',
    EDUCATIONAL_INSTITUTIONS: 'EDUCATIONAL_INSTITUTIONS',
    OTHER: 'OTHER',
};

type TVolunteerProps = {
    id?: string;

    updatedAt?: number;
    createdAt?: number;
    verifiedEmail?: boolean;
    email: string;
    fullName: string;
    birthdate: string;
    cellphoneNumberWithDDD: string;
    occupation: constEnumType<typeof occupation>;
    university?: string;
    semester?: constEnumType<typeof semester>;
    speciality?: string;
    listFreeDaysOfWeek: Array<constEnumType<typeof freeDaysOfWeek>>;
    timeOfExperience?: string;
    howMuchParticipate: constEnumType<typeof howMuchParticipate>;
    howDidKnowOfSDR: constEnumType<typeof howDidKnowOfSDR>;
};

class Volunteer {
    constructor(props: TVolunteerProps) {
        Object.assign(this, {
            ...props,
            id: props.id || uuidv4(),
            createdAt: props.createdAt || Date.now(),
            updatedAt: props.updatedAt || Date.now(),
            numberOfFreeDaysOfWeek: props.listFreeDaysOfWeek.length,
            verifiedEmail: props.verifiedEmail || false,
        });
    }

    public readonly id: string;

    public readonly createdAt: number;

    public updatedAt?: number;

    public email: string;

    public fullName: string;

    public birthdate: string;

    public cellphoneNumberWithDDD: string;

    public occupation: constEnumType<typeof occupation>;

    public university?: string;

    public semester?: constEnumType<typeof semester>;

    public speciality?: string;

    public listFreeDaysOfWeek: Array<constEnumType<typeof freeDaysOfWeek>>;

    public numberOfFreeDaysOfWeek: number;

    public timeOfExperience?: string;

    public howMuchParticipate: constEnumType<typeof howMuchParticipate>;

    public howDidKnowOfSDR: constEnumType<typeof howDidKnowOfSDR>;

    public verifiedEmail: boolean;
}

export {
    TVolunteerProps,
    Volunteer,
    occupation,
    semester,
    freeDaysOfWeek,
    howDidKnowOfSDR,
    howMuchParticipate,
};
