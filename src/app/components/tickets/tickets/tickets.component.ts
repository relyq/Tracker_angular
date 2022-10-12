import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project';
import { Ticket } from 'src/app/core/models/ticket';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TicketService } from 'src/app/core/services/ticket.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { searchFilter } from 'src/app/shared/components/globals';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  project!: Project;
  tickets!: Ticket[];
  filteredTickets!: Ticket[];
  ticketsAll!: Ticket[];
  closed: boolean = false;
  users!: User[];
  canCreate: boolean = false;
  dataSource = new MatTableDataSource<Ticket>();
  displayedColumns: string[] = [
    'title',
    'description',
    'priority',
    'type',
    'status',
    'submitter',
    'assignee',
    'activity',
    'closed',
    'created'
  ];

  filter: Function = searchFilter;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private ticketService: TicketService,
    private projectService: ProjectService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProject().subscribe((project) => {
      this.project = project;
      this.getTickets();
      this.getUsers();
      this.canCreate =
        this.authService.isRole('Administrator') ||
        this.authService.isRole('Developer');
    });
  }

  getUsername(id: string): string {
    return this.users.find((u) => u.id === id)?.username as string;
  }

  getProject(): Observable<Project> {
    const id = Number(this.route.snapshot.paramMap.get('projectid'));
    return this.projectService.getProject(id);
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((u) => {
      this.users = u;
    });
  }

  getTickets(): void {
    this.ticketService.getTickets(this.project.id).subscribe((tickets) => {
      this.ticketsAll = tickets;
      this.ticketsAll.sort(
        (a, b) =>
          new Date(b.created as Date).getTime() -
          new Date(a.created as Date).getTime()
      );
      this.dataSource.data = this.ticketsAll;
      this.showStatus('open');
    });
  }

  showStatus(status: string) {
    if (this.ticketsAll) {
      this.tickets = this.ticketsAll;

      if (status) {
        this.tickets = this.ticketsAll
          .filter((t) => t.status === status)
          .sort(
            (a, b) =>
              new Date(
                (status === 'open' ? b.created : b.closed) as Date
              ).getTime() -
              new Date(
                (status === 'open' ? a.created : a.closed) as Date
              ).getTime()
          );
      }
    }

    this.filteredTickets = this.tickets;
    this.dataSource.data = this.tickets;

    this.closed = status === 'open' ? false : true;
  }

  goBack(): void {
    this.router.navigate(['/project/' + this.project.id]);
  }
}
