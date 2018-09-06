import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NatchiyarDemo5SharedModule } from 'app/shared';
import {
    DiagnosisComponent,
    DiagnosisDetailComponent,
    DiagnosisUpdateComponent,
    DiagnosisDeletePopupComponent,
    DiagnosisDeleteDialogComponent,
    diagnosisRoute,
    diagnosisPopupRoute
} from './';

import { ChartModule } from 'primeng/primeng';

const ENTITY_STATES = [...diagnosisRoute, ...diagnosisPopupRoute];

@NgModule({
    imports: [NatchiyarDemo5SharedModule, ChartModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DiagnosisComponent,
        DiagnosisDetailComponent,
        DiagnosisUpdateComponent,
        DiagnosisDeleteDialogComponent,
        DiagnosisDeletePopupComponent
    ],
    entryComponents: [DiagnosisComponent, DiagnosisUpdateComponent, DiagnosisDeleteDialogComponent, DiagnosisDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NatchiyarDemo5DiagnosisModule {}
