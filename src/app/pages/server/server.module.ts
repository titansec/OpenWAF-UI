import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import {routedComponents, ServerRoutingModule} from './server-routing.module';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {ModalContentRuleComponent} from "./server-list/modal-content-rule.component";
import {ModalModule} from "ngx-bootstrap";

@NgModule({
  imports: [
    ModalModule.forRoot(),
    ThemeModule,
    ServerRoutingModule,
    Ng2SmartTableModule,
    NgxDatatableModule,
  ],
  declarations: [
    routedComponents,
    ModalContentRuleComponent
  ],
  entryComponents: [
    ModalContentRuleComponent
  ]
})
export class ServerModule { }
