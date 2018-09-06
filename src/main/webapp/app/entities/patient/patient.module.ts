import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import needed PrimeNG modules here
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { AccordionModule } from 'primeng/components/accordion/accordion';
import { ButtonModule } from 'primeng/components/button/button';
import { GrowlModule } from 'primeng/components/growl/growl';
import { WizardModule } from 'primeng-extensions/components/wizard/wizard.js';
import { FormsModule } from '@angular/forms';

import { NatchiyarDemo5SharedModule } from 'app/shared';
import {
    PatientComponent,
    PatientDetailComponent,
    PatientUpdateComponent,
    PatientDeletePopupComponent,
    PatientDeleteDialogComponent,
    patientRoute,
    patientPopupRoute
} from './';

const ENTITY_STATES = [...patientRoute, ...patientPopupRoute];

@NgModule({
    imports: [
        NatchiyarDemo5SharedModule,
        BrowserAnimationsModule,
        FormsModule,
        AccordionModule,
        GrowlModule,
        CheckboxModule,
        SelectButtonModule,
        ButtonModule,
        WizardModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PatientComponent,
        PatientDetailComponent,
        PatientUpdateComponent,
        PatientDeleteDialogComponent,
        PatientDeletePopupComponent
    ],
    entryComponents: [PatientComponent, PatientUpdateComponent, PatientDeleteDialogComponent, PatientDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NatchiyarDemo5PatientModule {}
