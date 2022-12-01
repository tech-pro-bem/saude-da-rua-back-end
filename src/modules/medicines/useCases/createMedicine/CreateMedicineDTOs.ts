export type CreateMedicineRequestDTO = {
    fullName: string;
    CEP: string;
    state: string;
    cellPhoneWithDDD: string;
    email: string;
    medicineName: string;
    milligrams: number;
    quantity: number;
    expirationDate: Date;
    pharmaceuticalForm: string;
};
