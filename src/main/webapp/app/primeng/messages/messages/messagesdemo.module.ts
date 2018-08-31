import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NatchiyarDemo5SharedModule } from '../../../shared';
import { ButtonModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { WizardModule } from 'primeng-extensions/components/wizard/wizard.js';

import { MessagesDemoComponent, messagesDemoRoute } from './';

const primeng_STATES = [messagesDemoRoute];

@NgModule({
    imports: [
        NatchiyarDemo5SharedModule,
        ButtonModule,
        MessagesModule,
        GrowlModule,
        WizardModule,
        RouterModule.forRoot(primeng_STATES, { useHash: true })
    ],
    declarations: [MessagesDemoComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NatchiyarDemo5MessagesDemoModule {}
