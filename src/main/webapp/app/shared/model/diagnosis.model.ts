import { IPatient } from 'app/shared/model//patient.model';

export interface IDiagnosis {
    id?: number;
    diagnosisName?: string;
    patients?: IPatient[];
}

export class Diagnosis implements IDiagnosis {
    constructor(public id?: number, public diagnosisName?: string, public patients?: IPatient[]) {}
}
