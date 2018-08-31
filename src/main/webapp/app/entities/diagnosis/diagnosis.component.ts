import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDiagnosis } from 'app/shared/model/diagnosis.model';
import { Principal } from 'app/core';
import { DiagnosisService } from './diagnosis.service';

@Component({
    selector: 'jhi-diagnosis',
    templateUrl: './diagnosis.component.html'
})
export class DiagnosisComponent implements OnInit, OnDestroy {
    diagnoses: IDiagnosis[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private diagnosisService: DiagnosisService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.diagnosisService.query().subscribe(
            (res: HttpResponse<IDiagnosis[]>) => {
                this.diagnoses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
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
