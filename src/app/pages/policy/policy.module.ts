import { NgModule } from '@angular/core';
import {PolicyRouting} from "./policy.routing";
import {PolicyListComponent} from "./policy-list/policy-list.component";
import {PolicyComponent} from "./policy.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {SecrulesComponent} from "./secrules/secrules.component";
import {AntilinkComponent} from "./antilink/antilink.component";
import {LimitconnComponent} from "./limitconn/limitconn.component";
import {AntidetectionComponent} from "./antidetection/antidetection.component";
import {ModalContentPolicyComponent} from "./policy-list/modal-content-policy.component";
import {ModalModule} from "ngx-bootstrap";
import {ThemeModule} from "../../@theme/theme.module";
import {RlTagInputModule} from "angular2-tag-input/dist";

@NgModule({
    imports: [
        ModalModule.forRoot(),
      ThemeModule,
        PolicyRouting,
        NgxDatatableModule,
      RlTagInputModule,
    ],
    declarations: [
        PolicyListComponent, ModalContentPolicyComponent, PolicyComponent,
        SecrulesComponent, AntilinkComponent, LimitconnComponent, AntidetectionComponent],
    entryComponents: [ModalContentPolicyComponent]
})
export class PolicyModule { }
