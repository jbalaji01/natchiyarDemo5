import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NatchiyarDemo5PatientModule } from './patient/patient.module';
import { NatchiyarDemo5VisitModule } from './visit/visit.module';
import { NatchiyarDemo5DiagnosisModule } from './diagnosis/diagnosis.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        NatchiyarDemo5PatientModule,
        NatchiyarDemo5VisitModule,
        NatchiyarDemo5DiagnosisModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NatchiyarDemo5EntityModule {}
