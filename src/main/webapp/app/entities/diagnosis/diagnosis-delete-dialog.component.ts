import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiagnosis } from 'app/shared/model/diagnosis.model';
import { DiagnosisService } from './diagnosis.service';

@Component({
    selector: 'jhi-diagnosis-delete-dialog',
    templateUrl: './diagnosis-delete-dialog.component.html'
})
export class DiagnosisDeleteDialogComponent {
    diagnosis: IDiagnosis;

    constructor(private diagnosisService: DiagnosisService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.diagnosisService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'diagnosisListModification',
                content: 'Deleted an diagnosis'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-diagnosis-delete-popup',
    template: ''
})
export class DiagnosisDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ diagnosis }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DiagnosisDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.diagnosis = diagnosis;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
