import { NgModule } from '@angular/core';

import { NatchiyarDemo5SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [NatchiyarDemo5SharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [NatchiyarDemo5SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class NatchiyarDemo5SharedCommonModule {}
