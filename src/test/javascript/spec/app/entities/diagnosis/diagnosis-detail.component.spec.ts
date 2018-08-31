/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NatchiyarDemo5TestModule } from '../../../test.module';
import { DiagnosisDetailComponent } from 'app/entities/diagnosis/diagnosis-detail.component';
import { Diagnosis } from 'app/shared/model/diagnosis.model';

describe('Component Tests', () => {
    describe('Diagnosis Management Detail Component', () => {
        let comp: DiagnosisDetailComponent;
        let fixture: ComponentFixture<DiagnosisDetailComponent>;
        const route = ({ data: of({ diagnosis: new Diagnosis(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NatchiyarDemo5TestModule],
                declarations: [DiagnosisDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DiagnosisDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DiagnosisDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.diagnosis).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
