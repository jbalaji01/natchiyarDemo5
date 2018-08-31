/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NatchiyarDemo5TestModule } from '../../../test.module';
import { DiagnosisDeleteDialogComponent } from 'app/entities/diagnosis/diagnosis-delete-dialog.component';
import { DiagnosisService } from 'app/entities/diagnosis/diagnosis.service';

describe('Component Tests', () => {
    describe('Diagnosis Management Delete Component', () => {
        let comp: DiagnosisDeleteDialogComponent;
        let fixture: ComponentFixture<DiagnosisDeleteDialogComponent>;
        let service: DiagnosisService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NatchiyarDemo5TestModule],
                declarations: [DiagnosisDeleteDialogComponent]
            })
                .overrideTemplate(DiagnosisDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DiagnosisDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiagnosisService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
