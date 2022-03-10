/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from 'uuid';

enum occupation {
    MEDICO = 'MEDICO(A)',
    ENFERMEIRO = 'ENFERMEIRO(A)',
    FARMACEUTICO = 'FARMACEUTICO(A)',
    ESTUDANTE = 'ESTUDANTE',
}

enum semester {
    FIRST = '1',
    SECOND = '2',
    THIRD = '3',
    FOURTH = '4',
    FIFTH = '5',
    SIXTH = '6',
    SEVENTH = '7',
    EIGHTH = '8',
    NINTH = '9',
    TENTH = '10',
    MORE = '10+',
}

enum freeDaysOfWeek {
    DOMINGO = 'DOMINGO',
    SEGUNDA = 'SEGUNDA',
    TERCA = 'TERÇA',
    QUARTA = 'QUARTA',
    QUINTA = 'QUINTA',
    SEXTA = 'SEXTA',
    SABADO = 'SÁBADO',
}

enum howMuchParticipate {
    NOT_PARTICIPATED = 'NOT',
    ONE_PARTICIPATION = '1',
    BETWEEN_TWO_AND_FIVE_PARTICIPATION = '2~5',
    MORE_THAN_FIVE_PARTICIPATION = '5+',
}

enum howDidKnowOfSDR {
    SITE = 'SITE',
    INSTAGRAM = 'INSTAGRAM',
    POSTS = 'POSTS',
    EDUCATIONAL_INSTITUTIONS = 'INSTITUIÇÕES DE ENSINO',
    ANOTHER = 'OUTRO',
}

type TVolunteerProps = {
    updatedAt?: number;
    email: string;
    fullName: string;
    birthdate: string;
    cellphoneNumberWithDDD: string;
    occupation: occupation;
    university?: string;
    semester?: semester;
    speciality?: string;
    listFreeDaysOfWeek: Array<freeDaysOfWeek>;
    timeOfExperience: string;
    howMuchParticipate: howMuchParticipate;
    howDidKnowOfSDR: howDidKnowOfSDR;
};

class Volunteer {
    public readonly id?: string;

    public readonly createdAt?: number;

    public updatedAt?: number;

    public email?: string;

    public fullName?: string;

    public birthdate?: string;

    public cellphoneNumberWithDDD?: string;

    public occupation?: occupation;

    public university?: string;

    public semester?: semester;

    public speciality?: string;

    public listFreeDaysOfWeek?: Array<freeDaysOfWeek>;

    public numberOfFreeDaysOfWeek?: number;

    public timeOfExperience?: string;

    public howMuchParticipate?: howMuchParticipate;

    public howDidKnowOfSDR?: howDidKnowOfSDR;

    constructor(props: TVolunteerProps) {
        this.id = uuidv4();
        this.createdAt = Date.now();

        if (!props.updatedAt) this.updatedAt = Date.now();

        this.numberOfFreeDaysOfWeek = props.listFreeDaysOfWeek.length;

        Object.assign(this, props);
    }
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
