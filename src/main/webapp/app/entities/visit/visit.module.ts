import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NatchiyarDemo5SharedModule } from 'app/shared';
import {
    VisitComponent,
    VisitDetailComponent,
    VisitUpdateComponent,
    VisitDeletePopupComponent,
    VisitDeleteDialogComponent,
    visitRoute,
    visitPopupRoute
} from './';

const ENTITY_STATES = [...visitRoute, ...visitPopupRoute];

@NgModule({
    imports: [NatchiyarDemo5SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [VisitComponent, VisitDetailComponent, VisitUpdateComponent, VisitDeleteDialogComponent, VisitDeletePopupComponent],
    entryComponents: [VisitComponent, VisitUpdateComponent, VisitDeleteDialogComponent, VisitDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NatchiyarDemo5VisitModule {}
