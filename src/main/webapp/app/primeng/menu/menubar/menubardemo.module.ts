import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NatchiyarDemo5SharedModule } from '../../../shared';
import { GrowlModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/components/menubar/menubar';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { WizardModule } from 'primeng-extensions/components/wizard/wizard.js';

import { MenuBarDemoComponent, menubarDemoRoute } from './';

const primeng_STATES = [menubarDemoRoute];

@NgModule({
    imports: [
        NatchiyarDemo5SharedModule,
        CommonModule,
        BrowserAnimationsModule,
        MenubarModule,
        GrowlModule,
        ButtonModule,
        WizardModule,
        InputTextModule,
        RouterModule.forRoot(primeng_STATES, { useHash: true })
    ],
    declarations: [MenuBarDemoComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NatchiyarDemo5MenuBarDemoModule {}
