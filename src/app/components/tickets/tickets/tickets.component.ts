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
import { getPriority, searchFilter } from 'src/app/shared/components/globals';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/shared/components/modals/delete-modal/delete-modal.component';
import { MatSort } from '@angular/material/sort';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
  search!: string;
  closed: boolean = false;
  users!: User[];
  canCreate: boolean = false;
  status: string = 'open'; // should remove this.closed

  totalRows: number = 200;

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

  hideDescription: boolean = false;
  hideAssignee: boolean = false;
  hideSubmitter: boolean = false;
  hidePriority: boolean = false;
  hideType: boolean = false;
  hideActivity: boolean = false;
  hideStatus: boolean = true;

  hoverRow!: number;
  cards: boolean = false;
  cardCols: number = 4;

  filter: Function = searchFilter;
  getPriority: Function = getPriority;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private ticketService: TicketService,
    private projectService: ProjectService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    public Modal: MatDialog
  ) {}

  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  ngOnInit(): void {
    this.isAdmin = this.authService.isRole(this.authService.adminRole);

    this.breakpointObserver
      .observe([
        Breakpoints.XLarge,
        Breakpoints.Medium,
        Breakpoints.Small,
        Breakpoints.XSmall
      ])
      .subscribe((res) => {
        this.hideDescription = false;
        this.hideAssignee = false;
        this.hideSubmitter = false;
        this.hidePriority = false;
        this.hideActivity = false;
        this.hideType = false;

        this.cards = false;
        this.cardCols = 4;

        if (!res.breakpoints[Breakpoints.XLarge]) {
          this.hideDescription = true;
          this.cardCols = 3;

          if (
            res.breakpoints[Breakpoints.Medium] ||
            res.breakpoints[Breakpoints.Small] ||
            res.breakpoints[Breakpoints.XSmall]
          ) {
            this.hideAssignee = true;
            this.hideSubmitter = true;
            this.cardCols = 2;

            if (
              res.breakpoints[Breakpoints.Small] ||
              res.breakpoints[Breakpoints.XSmall]
            ) {
              this.hidePriority = true;
              this.hideStatus = true;
            }

            if (res.breakpoints[Breakpoints.XSmall]) {
              this.hideActivity = true;
              this.hideType = true;
              this.cardCols = 1;
              this.cards = true;
            }
          }
        }
      });

    this.getProject().subscribe((project) => {
      this.project = project;

      this.getTickets('open');
      this.getUsers();
      this.canCreate =
        this.authService.isRole('Administrator') ||
        this.authService.isRole('Developer');
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getUsername(id: string): string {
    return this.users.find((u) => u.id === id)?.username as string;
  }

  getProject(): Observable<Project> {
    const id = Number(this.route.snapshot.paramMap.get('projectid'));
    return this.projectService.getProject(id);
  }

  getUsers(): void {
    this.userService
      .getUsers(this.authService.getOrganization())
      .subscribe((u) => {
        this.users = u;
      });
  }

  getTickets(status: string, offset?: number | undefined): void {
    this.status = status;

    this.dataSource.data = [];

    this.ticketService
      .getTickets(this.project.id, status, 50, offset)
      .subscribe((res) => {
        this.tickets = res.tickets;
        this.totalRows = res.count;

        // 'all' & 'open' tickets should come pre sorted
        if (status === 'closed') {
          this.tickets.sort(
            (a, b) =>
              new Date(b.closed as Date).getTime() -
              new Date(a.closed as Date).getTime()
          );
        }

        this.filteredTickets = this.tickets;
        this.dataSource.data = this.tickets;

        // im always hiding status for now
        // this.hideStatus = status === '' ? false : true;
        this.closed = status === 'Open' ? false : true;
      });
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

  handlePageEvent(event: PageEvent): void {
    console.log(event);
    this.getTickets(this.status, event.pageIndex * event.pageSize);
  }

  filterCards(search: string): void {
    const searchTerm = search.toLowerCase();

    this.filteredTickets = this.tickets.filter(
      (t) =>
        t.title.toLowerCase().includes(searchTerm) ||
        t.description.toLowerCase().includes(searchTerm)
    );
  }
}
