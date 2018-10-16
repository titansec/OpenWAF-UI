import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PolicyComponent} from "./policy.component";
import {SecrulesComponent} from "./secrules/secrules.component";
import {AntilinkComponent} from "./antilink/antilink.component";
import {LimitconnComponent} from "./limitconn/limitconn.component";
import {AntidetectionComponent} from "./antidetection/antidetection.component";

const routes: Routes = [
  {
    path: '',
    component: PolicyComponent,
  },
  {
    path: 'edit/:_id',
    component: SecrulesComponent,
    data: {
      pageTitle: '编辑',
    },
  },
  {
    path: 'secrules/:_id',
    component: SecrulesComponent,
    data: {
      pageTitle: '攻击防护',
    },
  },
  {
    path: 'antilink/:_id',
    component: AntilinkComponent,
    data: {
      pageTitle: '防信息滥用',
    },
  },
  {
    path: 'limitconn/:_id',
    component: LimitconnComponent,
    data: {
      pageTitle: '防CC',
    },
  },
  {
    path: 'antidetection/:_id',
    component: AntidetectionComponent,
    data: {
      pageTitle: '防探测',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRouting {
}
