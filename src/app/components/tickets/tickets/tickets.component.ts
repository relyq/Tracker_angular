import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/shared/components/modals/delete-modal/delete-modal.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, AfterViewInit {
  isAdmin: boolean = false;
  project!: Project;
  tickets!: Ticket[];
  filteredTickets!: Ticket[];
  ticketsAll!: Ticket[];
  closed: boolean = false;
  users!: User[];
  canCreate: boolean = false;
  dataSource = new MatTableDataSource<Ticket>();
  displayedColumns: string[] = [
    'id',
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

  hoverRow!: number;
  cards: boolean = false;
  cardCols: number = 4;

  filter: Function = searchFilter;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private ticketService: TicketService,
    private projectService: ProjectService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    public Modal: MatDialog
  ) {}

  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isRole(this.authService.adminRole);
    this.getProject().subscribe((project) => {
      this.project = project;
      this.getTickets();
      this.getUsers();
      this.canCreate =
        this.authService.isRole('Administrator') ||
        this.authService.isRole('Developer');
    });
  }

  ngAfterViewInit(): void {}

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

      this.showStatus('Open');
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
                (status === 'Open' ? b.created : b.closed) as Date
              ).getTime() -
              new Date(
                (status === 'Open' ? a.created : a.closed) as Date
              ).getTime()
          );
      }
    }

    this.filteredTickets = this.tickets;
    this.dataSource.data = this.tickets;

    this.closed = status === 'Open' ? false : true;
  }

  goBack(): void {
    this.router.navigate(['/project/']);
  }

  deleteProject(): void {
    this.Modal.open(DeleteModalComponent, {
      width: '250px'
    })
      .afterClosed()
      .subscribe((res) => {
        if (res && this.project.id) {
          this.projectService.deleteProject(this.project.id).subscribe(() => {
            this.goBack();
          });
        }
      });
  }

  getPriority(priority: number): string {
    let title: string = '';

    switch (priority) {
      case 1: {
        title = 'Low';
        break;
      }
      case 2: {
        title = 'Medium';
        break;
      }
      case 3: {
        title = 'High';
        break;
      }
      case 4: {
        title = 'Urgent';
        break;
      }
      case 5: {
        title = 'Critical';
        break;
      }
    }

    return title;
  }
}
