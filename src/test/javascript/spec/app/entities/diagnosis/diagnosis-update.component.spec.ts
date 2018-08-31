/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NatchiyarDemo5TestModule } from '../../../test.module';
import { DiagnosisUpdateComponent } from 'app/entities/diagnosis/diagnosis-update.component';
import { DiagnosisService } from 'app/entities/diagnosis/diagnosis.service';
import { Diagnosis } from 'app/shared/model/diagnosis.model';

describe('Component Tests', () => {
    describe('Diagnosis Management Update Component', () => {
        let comp: DiagnosisUpdateComponent;
        let fixture: ComponentFixture<DiagnosisUpdateComponent>;
        let service: DiagnosisService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NatchiyarDemo5TestModule],
                declarations: [DiagnosisUpdateComponent]
            })
                .overrideTemplate(DiagnosisUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DiagnosisUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiagnosisService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Diagnosis(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.diagnosis = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Diagnosis();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.diagnosis = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
