import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDiagnosis } from 'app/shared/model/diagnosis.model';
import { Principal } from 'app/core';
import { DiagnosisService } from './diagnosis.service';

import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from '../patient/patient.service';
import { UIChart } from 'primeng/primeng';

@Component({
    selector: 'jhi-diagnosis',
    templateUrl: './diagnosis.component.html'
})
export class DiagnosisComponent implements OnInit, OnDestroy {
    diagnoses: IDiagnosis[];
    patients: IPatient[];
    data: any;
    changedData: any;
    currentAccount: any;
    eventSubscriber: Subscription;

    visible = true;

    @ViewChild('pieChart') chart: UIChart;

    constructor(
        private patientService: PatientService,
        private diagnosisService: DiagnosisService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
        this.loadAll();
    }

    loadAll() {
        this.diagnosisService.query().subscribe(
            (res: HttpResponse<IDiagnosis[]>) => {
                this.diagnoses = res.body;
                this.loadAllPatients();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadAllPatients() {
        this.patientService.query().subscribe(
            (res: HttpResponse<IPatient[]>) => {
                this.patients = res.body;
                this.fillPatientsIntoDiagnosis();
                this.loadChartData();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    fillPatientsIntoDiagnosis() {
        const map = new Map();
        for (const diagnosis of this.diagnoses) {
            map.set(diagnosis.id, diagnosis);
        }

        for (const patient of this.patients) {
            for (const diagnosisP of patient.diagnoses) {
                const diagnosisD = map.get(diagnosisP.id);
                if (diagnosisD.patients == null) {
                    diagnosisD.patients = [] as IPatient[];
                }
                diagnosisD.patients.push(patient);
            }
        }
    }

    loadChartData() {
        this.changedData = {};
        this.changedData.labels = [];
        this.changedData.datasets = [];
        this.changedData.datasets[0] = {};
        this.changedData.datasets[0].data = [];
        this.changedData.datasets[0].backgroundColor = ['#FF6384', '#36A2EB', '#FFCE56'];
        this.changedData.datasets[0].hoverBackgroundColor = ['#FF6384', '#36A2EB', '#FFCE56'];

        this.diagnoses.forEach(diagnosis => {
            // console.log(diagnosis.diagnosisName);
            if (diagnosis.patients != null && diagnosis.patients.length > 0) {
                this.changedData.labels.push(diagnosis.diagnosisName);
                this.changedData.datasets[0].data.push(diagnosis.patients.length);
                // console.log(this.data.labels + ' ' + this.data.datasets.data);
            }
        });

        this.data = Object.assign({}, this.changedData);

        console.log(this.data);

        // this.updateVisibility();
    }

    updateVisibility(): void {
        this.chart.refresh();
        this.visible = false;
        setTimeout(() => (this.visible = true), 0);
    }

    ngOnInit() {
        // this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDiagnoses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDiagnosis) {
        return item.id;
    }

    registerChangeInDiagnoses() {
        this.eventSubscriber = this.eventManager.subscribe('diagnosisListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
