import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ServerComponent} from "./server.component";
import {ServerListComponent} from "./server-list/server-list.component";


const routes: Routes = [{
  path: '',
  component: ServerComponent,
  children: [
    {
      path: '',
      redirectTo: 'server-list',
      pathMatch: 'full',
    },
    {
      path: 'server-list',
      component: ServerListComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServerRoutingModule {
}

export const routedComponents = [
  ServerComponent,
  ServerListComponent,
];
