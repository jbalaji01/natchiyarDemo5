import { Moment } from 'moment';
import { IPatient } from 'app/shared/model//patient.model';

export interface IVisit {
    id?: number;
    visitDate?: Moment;
    mSE?: string;
    physicalExamination?: string;
    treatment?: string;
    patient?: IPatient;
}

export class Visit implements IVisit {
    constructor(
        public id?: number,
        public visitDate?: Moment,
        public mSE?: string,
        public physicalExamination?: string,
        public treatment?: string,
        public patient?: IPatient
    ) {}
}
