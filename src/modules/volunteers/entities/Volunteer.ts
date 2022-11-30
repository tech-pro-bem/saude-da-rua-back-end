/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from 'uuid';
import { constEnumType } from '../../../utils/ConstEnumType';

const occupation: {
    [x: string]:
        | 'MEDICO'
        | 'ENFERMEIRO'
        | 'FARMACEUTICO'
        | 'ESTUDANTE'
        | 'TECNICO_DE_ENFERMAGEM'
        | 'PSICOLOGO'
        | 'NUTRICIONISTA'
        | 'ASSISTENTE_SOCIAL'
        | 'DENTISTA'
        | 'VETERINARIO';
} = {
    MEDICO: 'MEDICO',
    ENFERMEIRO: 'ENFERMEIRO',
    FARMACEUTICO: 'FARMACEUTICO',
    ESTUDANTE: 'ESTUDANTE',
    TECNICO_DE_ENFERMAGEM: 'TECNICO_DE_ENFERMAGEM',
    PSICOLOGO: 'PSICOLOGO',
    NUTRICIONISTA: 'NUTRICIONISTA',
    ASSISTENTE_SOCIAL: 'ASSISTENTE_SOCIAL',
    DENTISTA: 'DENTISTA',
    VETERINARIO: 'VETERINARIO',
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
        | 'ELEVENTH'
        | 'TWELFTH'
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
    ELEVENTH: 'ELEVENTH',
    TWELFTH: 'TWELFTH',
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

type VolunteerProps = {
    id?: string;

    updatedAt?: Date;
    createdAt?: Date;
    verifiedEmail?: boolean;
    email: string;
    fullName: string;
    birthdate: string;
    isCurrentlyParticipating?: boolean;
    cellphoneNumberWithDDD: string;
    occupation: constEnumType<typeof occupation>;
    university?: string;
    semester?: constEnumType<typeof semester>;
    speciality?: string;
    listFreeDaysOfWeek: Array<constEnumType<typeof freeDaysOfWeek>>;
    timeOfExperience?: string;
    howMuchParticipate: constEnumType<typeof howMuchParticipate>;
    howDidKnowOfSDR: string;
};

class Volunteer {
    constructor(props: VolunteerProps) {
        Object.assign(this, {
            ...props,
            id: props.id || uuidv4(),
            createdAt: props.createdAt || new Date(),
            updatedAt: props.updatedAt || new Date(),
            isCurrentlyParticipating: props.isCurrentlyParticipating ?? false,
            numberOfFreeDaysOfWeek: props.listFreeDaysOfWeek.length,
            verifiedEmail: props.verifiedEmail ?? false,
        });
    }

    public readonly id: string;

    public readonly createdAt: Date;

    public updatedAt: Date;

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

    public isCurrentlyParticipating: boolean;

    public howDidKnowOfSDR: string;

    public verifiedEmail: boolean;
}

export {
    VolunteerProps,
    Volunteer,
    occupation,
    semester,
    freeDaysOfWeek,
    howMuchParticipate,
};
