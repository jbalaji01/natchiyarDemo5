/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NatchiyarDemo5TestModule } from '../../../test.module';
import { DiagnosisComponent } from 'app/entities/diagnosis/diagnosis.component';
import { DiagnosisService } from 'app/entities/diagnosis/diagnosis.service';
import { Diagnosis } from 'app/shared/model/diagnosis.model';

describe('Component Tests', () => {
    describe('Diagnosis Management Component', () => {
        let comp: DiagnosisComponent;
        let fixture: ComponentFixture<DiagnosisComponent>;
        let service: DiagnosisService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NatchiyarDemo5TestModule],
                declarations: [DiagnosisComponent],
                providers: []
            })
                .overrideTemplate(DiagnosisComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DiagnosisComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiagnosisService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Diagnosis(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.diagnoses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
