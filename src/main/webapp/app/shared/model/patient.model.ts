import { IVisit } from 'app/shared/model//visit.model';
import { IDiagnosis } from 'app/shared/model//diagnosis.model';

export interface IPatient {
    id?: number;
    name?: string;
    phone?: string;
    age?: number;
    isNew?: boolean;
    cheifComplaints?: string;
    onSet?: string;
    hOPI?: string;
    familyHistory?: string;
    preMorbidPersonality?: string;
    summary?: string;
    visits?: IVisit[];
    diagnoses?: IDiagnosis[];
}

export class Patient implements IPatient {
    constructor(
        public id?: number,
        public name?: string,
        public phone?: string,
        public age?: number,
        public isNew?: boolean,
        public cheifComplaints?: string,
        public onSet?: string,
        public hOPI?: string,
        public familyHistory?: string,
        public preMorbidPersonality?: string,
        public summary?: string,
        public visits?: IVisit[],
        public diagnoses?: IDiagnosis[]
    ) {
        this.isNew = this.isNew || false;
    }
}
