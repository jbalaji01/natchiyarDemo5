import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NatchiyarDemo5SharedModule } from '../../../shared';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { WizardModule } from 'primeng-extensions/components/wizard/wizard.js';
// import needed PrimeNG modules here
import { ProgressSpinnerModule } from 'primeng/components/progressspinner/progressspinner';
import { GrowlModule } from 'primeng/components/growl/growl';

import { ProgressSpinnerDemoComponent, progressspinnerDemoRoute } from './';

const primeng_STATES = [progressspinnerDemoRoute];

@NgModule({
    imports: [
        NatchiyarDemo5SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ProgressSpinnerModule,
        GrowlModule,
        WizardModule,
        RouterModule.forRoot(primeng_STATES, { useHash: true })
    ],
    declarations: [ProgressSpinnerDemoComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NatchiyarDemo5ProgressSpinnerDemoModule {}
