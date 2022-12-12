import { v4 as uuidV4 } from 'uuid';

export type MedicineProps = {
    id?: string;
    fullName: string;
    address: string;
    city: string;
    CEP: string;
    state: string;
    cellPhoneWithDDD: string;
    email: string;
    medicineName: string;
    milligrams: number;
    quantity: number;
    expirationDate: Date;
    pharmaceuticalForm: string;
    wasRead?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export class Medicine {
    constructor(props: MedicineProps) {
        Object.assign(this, {
            ...props,
            id: props.id ?? uuidV4(),
            wasRead: props.wasRead ?? false,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
        });
    }

    id: string;

    fullName: string;

    address: string;

    city: string;

    CEP: string;

    state: string;

    cellPhoneWithDDD: string;

    email: string;

    medicineName: string;

    milligrams: number;

    quantity: number;

    expirationDate: Date;

    pharmaceuticalForm: string;

    wasRead: boolean;

    createdAt: Date;

    updatedAt: Date;
}
