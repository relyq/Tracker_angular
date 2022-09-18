import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';
import { LoginComponent } from './login/login.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AuthGuard } from './core/services/auth.guard';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '', canActivate: [AuthGuard] },
      {
        path: 'project',
        component: ProjectsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'project/create',
        component: ProjectEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'project/edit/:projectid',
        component: ProjectEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'project/:projectid',
        component: ProjectDetailComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'project/:projectid/ticket',
        component: TicketsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'project/:projectid/ticket/create',
        component: TicketEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'project/:projectid/ticket/edit/:ticketid',
        component: TicketEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'project/:projectid/ticket/:ticketid',
        component: TicketDetailComponent,
        canActivate: [AuthGuard]
      },
      { path: 'account', component: AccountComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
