import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDiagnosis } from 'app/shared/model/diagnosis.model';
import { DiagnosisService } from './diagnosis.service';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from 'app/entities/patient';

@Component({
    selector: 'jhi-diagnosis-update',
    templateUrl: './diagnosis-update.component.html'
})
export class DiagnosisUpdateComponent implements OnInit {
    private _diagnosis: IDiagnosis;
    isSaving: boolean;

    patients: IPatient[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private diagnosisService: DiagnosisService,
        private patientService: PatientService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ diagnosis }) => {
            this.diagnosis = diagnosis;
        });
        this.patientService.query().subscribe(
            (res: HttpResponse<IPatient[]>) => {
                this.patients = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.diagnosis.id !== undefined) {
            this.subscribeToSaveResponse(this.diagnosisService.update(this.diagnosis));
        } else {
            this.subscribeToSaveResponse(this.diagnosisService.create(this.diagnosis));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDiagnosis>>) {
        result.subscribe((res: HttpResponse<IDiagnosis>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPatientById(index: number, item: IPatient) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get diagnosis() {
        return this._diagnosis;
    }

    set diagnosis(diagnosis: IDiagnosis) {
        this._diagnosis = diagnosis;
    }
}
