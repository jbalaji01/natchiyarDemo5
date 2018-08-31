import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IVisit } from 'app/shared/model/visit.model';
import { VisitService } from './visit.service';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from 'app/entities/patient';

@Component({
    selector: 'jhi-visit-update',
    templateUrl: './visit-update.component.html'
})
export class VisitUpdateComponent implements OnInit {
    private _visit: IVisit;
    isSaving: boolean;

    patients: IPatient[];
    visitDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private visitService: VisitService,
        private patientService: PatientService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ visit }) => {
            this.visit = visit;
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
        this.visit.visitDate = moment(this.visitDate, DATE_TIME_FORMAT);
        if (this.visit.id !== undefined) {
            this.subscribeToSaveResponse(this.visitService.update(this.visit));
        } else {
            this.subscribeToSaveResponse(this.visitService.create(this.visit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVisit>>) {
        result.subscribe((res: HttpResponse<IVisit>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get visit() {
        return this._visit;
    }

    set visit(visit: IVisit) {
        this._visit = visit;
        this.visitDate = moment(visit.visitDate).format(DATE_TIME_FORMAT);
    }
}
