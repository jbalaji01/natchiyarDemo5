import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NatchiyarDemo5ButtonDemoModule } from './buttons/button/buttondemo.module';
import { NatchiyarDemo5SplitbuttonDemoModule } from './buttons/splitbutton/splitbuttondemo.module';

import { NatchiyarDemo5DialogDemoModule } from './overlay/dialog/dialogdemo.module';
import { NatchiyarDemo5ConfirmDialogDemoModule } from './overlay/confirmdialog/confirmdialogdemo.module';
import { NatchiyarDemo5LightboxDemoModule } from './overlay/lightbox/lightboxdemo.module';
import { NatchiyarDemo5TooltipDemoModule } from './overlay/tooltip/tooltipdemo.module';
import { NatchiyarDemo5OverlayPanelDemoModule } from './overlay/overlaypanel/overlaypaneldemo.module';
import { NatchiyarDemo5SideBarDemoModule } from './overlay/sidebar/sidebardemo.module';

import { NatchiyarDemo5KeyFilterDemoModule } from './inputs/keyfilter/keyfilterdemo.module';
import { NatchiyarDemo5InputTextDemoModule } from './inputs/inputtext/inputtextdemo.module';
import { NatchiyarDemo5InputTextAreaDemoModule } from './inputs/inputtextarea/inputtextareademo.module';
import { NatchiyarDemo5InputGroupDemoModule } from './inputs/inputgroup/inputgroupdemo.module';
import { NatchiyarDemo5CalendarDemoModule } from './inputs/calendar/calendardemo.module';
import { NatchiyarDemo5CheckboxDemoModule } from './inputs/checkbox/checkboxdemo.module';
import { NatchiyarDemo5ChipsDemoModule } from './inputs/chips/chipsdemo.module';
import { NatchiyarDemo5ColorPickerDemoModule } from './inputs/colorpicker/colorpickerdemo.module';
import { NatchiyarDemo5InputMaskDemoModule } from './inputs/inputmask/inputmaskdemo.module';
import { NatchiyarDemo5InputSwitchDemoModule } from './inputs/inputswitch/inputswitchdemo.module';
import { NatchiyarDemo5PasswordIndicatorDemoModule } from './inputs/passwordindicator/passwordindicatordemo.module';
import { NatchiyarDemo5AutoCompleteDemoModule } from './inputs/autocomplete/autocompletedemo.module';
import { NatchiyarDemo5SliderDemoModule } from './inputs/slider/sliderdemo.module';
import { NatchiyarDemo5SpinnerDemoModule } from './inputs/spinner/spinnerdemo.module';
import { NatchiyarDemo5RatingDemoModule } from './inputs/rating/ratingdemo.module';
import { NatchiyarDemo5SelectDemoModule } from './inputs/select/selectdemo.module';
import { NatchiyarDemo5SelectButtonDemoModule } from './inputs/selectbutton/selectbuttondemo.module';
import { NatchiyarDemo5ListboxDemoModule } from './inputs/listbox/listboxdemo.module';
import { NatchiyarDemo5RadioButtonDemoModule } from './inputs/radiobutton/radiobuttondemo.module';
import { NatchiyarDemo5ToggleButtonDemoModule } from './inputs/togglebutton/togglebuttondemo.module';
import { NatchiyarDemo5EditorDemoModule } from './inputs/editor/editordemo.module';

import { NatchiyarDemo5GrowlDemoModule } from './messages/growl/growldemo.module';
import { NatchiyarDemo5MessagesDemoModule } from './messages/messages/messagesdemo.module';
import { NatchiyarDemo5GalleriaDemoModule } from './multimedia/galleria/galleriademo.module';

import { NatchiyarDemo5FileUploadDemoModule } from './fileupload/fileupload/fileuploaddemo.module';

import { NatchiyarDemo5AccordionDemoModule } from './panel/accordion/accordiondemo.module';
import { NatchiyarDemo5PanelDemoModule } from './panel/panel/paneldemo.module';
import { NatchiyarDemo5TabViewDemoModule } from './panel/tabview/tabviewdemo.module';
import { NatchiyarDemo5FieldsetDemoModule } from './panel/fieldset/fieldsetdemo.module';
import { NatchiyarDemo5ToolbarDemoModule } from './panel/toolbar/toolbardemo.module';
import { NatchiyarDemo5GridDemoModule } from './panel/grid/griddemo.module';
import { NatchiyarDemo5ScrollPanelDemoModule } from './panel/scrollpanel/scrollpaneldemo.module';
import { NatchiyarDemo5CardDemoModule } from './panel/card/carddemo.module';

import { NatchiyarDemo5DataTableDemoModule } from './data/datatable/datatabledemo.module';
import { NatchiyarDemo5TableDemoModule } from './data/table/tabledemo.module';
import { NatchiyarDemo5DataGridDemoModule } from './data/datagrid/datagriddemo.module';
import { NatchiyarDemo5DataListDemoModule } from './data/datalist/datalistdemo.module';
import { NatchiyarDemo5DataScrollerDemoModule } from './data/datascroller/datascrollerdemo.module';
import { NatchiyarDemo5PickListDemoModule } from './data/picklist/picklistdemo.module';
import { NatchiyarDemo5OrderListDemoModule } from './data/orderlist/orderlistdemo.module';
import { NatchiyarDemo5ScheduleDemoModule } from './data/schedule/scheduledemo.module';
import { NatchiyarDemo5TreeDemoModule } from './data/tree/treedemo.module';
import { NatchiyarDemo5TreeTableDemoModule } from './data/treetable/treetabledemo.module';
import { NatchiyarDemo5PaginatorDemoModule } from './data/paginator/paginatordemo.module';
import { NatchiyarDemo5GmapDemoModule } from './data/gmap/gmapdemo.module';
import { NatchiyarDemo5OrgChartDemoModule } from './data/orgchart/orgchartdemo.module';
import { NatchiyarDemo5CarouselDemoModule } from './data/carousel/carouseldemo.module';
import { NatchiyarDemo5DataViewDemoModule } from './data/dataview/dataviewdemo.module';

import { NatchiyarDemo5BarchartDemoModule } from './charts/barchart/barchartdemo.module';
import { NatchiyarDemo5DoughnutchartDemoModule } from './charts/doughnutchart/doughnutchartdemo.module';
import { NatchiyarDemo5LinechartDemoModule } from './charts/linechart/linechartdemo.module';
import { NatchiyarDemo5PiechartDemoModule } from './charts/piechart/piechartdemo.module';
import { NatchiyarDemo5PolarareachartDemoModule } from './charts/polarareachart/polarareachartdemo.module';
import { NatchiyarDemo5RadarchartDemoModule } from './charts/radarchart/radarchartdemo.module';

import { NatchiyarDemo5DragDropDemoModule } from './dragdrop/dragdrop/dragdropdemo.module';

import { NatchiyarDemo5MenuDemoModule } from './menu/menu/menudemo.module';
import { NatchiyarDemo5ContextMenuDemoModule } from './menu/contextmenu/contextmenudemo.module';
import { NatchiyarDemo5PanelMenuDemoModule } from './menu/panelmenu/panelmenudemo.module';
import { NatchiyarDemo5StepsDemoModule } from './menu/steps/stepsdemo.module';
import { NatchiyarDemo5TieredMenuDemoModule } from './menu/tieredmenu/tieredmenudemo.module';
import { NatchiyarDemo5BreadcrumbDemoModule } from './menu/breadcrumb/breadcrumbdemo.module';
import { NatchiyarDemo5MegaMenuDemoModule } from './menu/megamenu/megamenudemo.module';
import { NatchiyarDemo5MenuBarDemoModule } from './menu/menubar/menubardemo.module';
import { NatchiyarDemo5SlideMenuDemoModule } from './menu/slidemenu/slidemenudemo.module';
import { NatchiyarDemo5TabMenuDemoModule } from './menu/tabmenu/tabmenudemo.module';

import { NatchiyarDemo5BlockUIDemoModule } from './misc/blockui/blockuidemo.module';
import { NatchiyarDemo5CaptchaDemoModule } from './misc/captcha/captchademo.module';
import { NatchiyarDemo5DeferDemoModule } from './misc/defer/deferdemo.module';
import { NatchiyarDemo5InplaceDemoModule } from './misc/inplace/inplacedemo.module';
import { NatchiyarDemo5ProgressBarDemoModule } from './misc/progressbar/progressbardemo.module';
import { NatchiyarDemo5RTLDemoModule } from './misc/rtl/rtldemo.module';
import { NatchiyarDemo5TerminalDemoModule } from './misc/terminal/terminaldemo.module';
import { NatchiyarDemo5ValidationDemoModule } from './misc/validation/validationdemo.module';
import { NatchiyarDemo5ProgressSpinnerDemoModule } from './misc/progressspinner/progressspinnerdemo.module';

@NgModule({
    imports: [
        NatchiyarDemo5MenuDemoModule,
        NatchiyarDemo5ContextMenuDemoModule,
        NatchiyarDemo5PanelMenuDemoModule,
        NatchiyarDemo5StepsDemoModule,
        NatchiyarDemo5TieredMenuDemoModule,
        NatchiyarDemo5BreadcrumbDemoModule,
        NatchiyarDemo5MegaMenuDemoModule,
        NatchiyarDemo5MenuBarDemoModule,
        NatchiyarDemo5SlideMenuDemoModule,
        NatchiyarDemo5TabMenuDemoModule,

        NatchiyarDemo5BlockUIDemoModule,
        NatchiyarDemo5CaptchaDemoModule,
        NatchiyarDemo5DeferDemoModule,
        NatchiyarDemo5InplaceDemoModule,
        NatchiyarDemo5ProgressBarDemoModule,
        NatchiyarDemo5InputMaskDemoModule,
        NatchiyarDemo5RTLDemoModule,
        NatchiyarDemo5TerminalDemoModule,
        NatchiyarDemo5ValidationDemoModule,

        NatchiyarDemo5ButtonDemoModule,
        NatchiyarDemo5SplitbuttonDemoModule,

        NatchiyarDemo5InputTextDemoModule,
        NatchiyarDemo5InputTextAreaDemoModule,
        NatchiyarDemo5InputGroupDemoModule,
        NatchiyarDemo5CalendarDemoModule,
        NatchiyarDemo5ChipsDemoModule,
        NatchiyarDemo5InputMaskDemoModule,
        NatchiyarDemo5InputSwitchDemoModule,
        NatchiyarDemo5PasswordIndicatorDemoModule,
        NatchiyarDemo5AutoCompleteDemoModule,
        NatchiyarDemo5SliderDemoModule,
        NatchiyarDemo5SpinnerDemoModule,
        NatchiyarDemo5RatingDemoModule,
        NatchiyarDemo5SelectDemoModule,
        NatchiyarDemo5SelectButtonDemoModule,
        NatchiyarDemo5ListboxDemoModule,
        NatchiyarDemo5RadioButtonDemoModule,
        NatchiyarDemo5ToggleButtonDemoModule,
        NatchiyarDemo5EditorDemoModule,
        NatchiyarDemo5ColorPickerDemoModule,
        NatchiyarDemo5CheckboxDemoModule,
        NatchiyarDemo5KeyFilterDemoModule,

        NatchiyarDemo5GrowlDemoModule,
        NatchiyarDemo5MessagesDemoModule,
        NatchiyarDemo5GalleriaDemoModule,

        NatchiyarDemo5FileUploadDemoModule,

        NatchiyarDemo5AccordionDemoModule,
        NatchiyarDemo5PanelDemoModule,
        NatchiyarDemo5TabViewDemoModule,
        NatchiyarDemo5FieldsetDemoModule,
        NatchiyarDemo5ToolbarDemoModule,
        NatchiyarDemo5GridDemoModule,
        NatchiyarDemo5ScrollPanelDemoModule,
        NatchiyarDemo5CardDemoModule,

        NatchiyarDemo5BarchartDemoModule,
        NatchiyarDemo5DoughnutchartDemoModule,
        NatchiyarDemo5LinechartDemoModule,
        NatchiyarDemo5PiechartDemoModule,
        NatchiyarDemo5PolarareachartDemoModule,
        NatchiyarDemo5RadarchartDemoModule,

        NatchiyarDemo5DragDropDemoModule,

        NatchiyarDemo5DialogDemoModule,
        NatchiyarDemo5ConfirmDialogDemoModule,
        NatchiyarDemo5LightboxDemoModule,
        NatchiyarDemo5TooltipDemoModule,
        NatchiyarDemo5OverlayPanelDemoModule,
        NatchiyarDemo5SideBarDemoModule,

        NatchiyarDemo5DataTableDemoModule,
        NatchiyarDemo5TableDemoModule,
        NatchiyarDemo5DataGridDemoModule,
        NatchiyarDemo5DataListDemoModule,
        NatchiyarDemo5DataViewDemoModule,
        NatchiyarDemo5DataScrollerDemoModule,
        NatchiyarDemo5ScheduleDemoModule,
        NatchiyarDemo5OrderListDemoModule,
        NatchiyarDemo5PickListDemoModule,
        NatchiyarDemo5TreeDemoModule,
        NatchiyarDemo5TreeTableDemoModule,
        NatchiyarDemo5PaginatorDemoModule,
        NatchiyarDemo5OrgChartDemoModule,
        NatchiyarDemo5GmapDemoModule,
        NatchiyarDemo5CarouselDemoModule,
        NatchiyarDemo5ProgressSpinnerDemoModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NatchiyarDemo5primengModule {}
