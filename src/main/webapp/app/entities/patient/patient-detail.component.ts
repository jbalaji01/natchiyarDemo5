import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';

import { IPatient } from 'app/shared/model/patient.model';
import { IVisit } from 'app/shared/model/visit.model';

import { VisitService } from '../visit/visit.service';

@Component({
    selector: 'jhi-patient-detail',
    templateUrl: './patient-detail.component.html',
    styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {
    patient: IPatient;
    visits: IVisit[];

    constructor(private activatedRoute: ActivatedRoute, private visitService: VisitService, private jhiAlertService: JhiAlertService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ patient }) => {
            this.patient = patient;
            this.loadVisitsOfPatient();
        });
    }

    loadVisitsOfPatient() {
        this.visitService.fetchVisitsOfPatient(this.patient.id).subscribe(
            (res: HttpResponse<IVisit[]>) => {
                this.visits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
