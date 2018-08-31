import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiagnosis } from 'app/shared/model/diagnosis.model';

@Component({
    selector: 'jhi-diagnosis-detail',
    templateUrl: './diagnosis-detail.component.html'
})
export class DiagnosisDetailComponent implements OnInit {
    diagnosis: IDiagnosis;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ diagnosis }) => {
            this.diagnosis = diagnosis;
        });
    }

    previousState() {
        window.history.back();
    }
}
