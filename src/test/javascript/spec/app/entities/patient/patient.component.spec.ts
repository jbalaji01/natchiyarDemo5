/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NatchiyarDemo5TestModule } from '../../../test.module';
import { PatientComponent } from 'app/entities/patient/patient.component';
import { PatientService } from 'app/entities/patient/patient.service';
import { Patient } from 'app/shared/model/patient.model';

describe('Component Tests', () => {
    describe('Patient Management Component', () => {
        let comp: PatientComponent;
        let fixture: ComponentFixture<PatientComponent>;
        let service: PatientService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NatchiyarDemo5TestModule],
                declarations: [PatientComponent],
                providers: []
            })
                .overrideTemplate(PatientComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PatientComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PatientService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Patient(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.patients[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
