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

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'project/create', component: ProjectEditComponent },
      { path: 'project/edit/:projectid', component: ProjectEditComponent },
      { path: 'project', component: ProjectsComponent },
      { path: 'project/:projectid', component: ProjectDetailComponent },
      { path: 'project/:projectid/ticket', component: TicketsComponent },
      {
        path: 'project/:projectid/ticket/create',
        component: TicketEditComponent
      },
      {
        path: 'project/:projectid/ticket/edit/:ticketid',
        component: TicketEditComponent
      },
      {
        path: 'project/:projectid/ticket/:ticketid',
        component: TicketDetailComponent
      }
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
