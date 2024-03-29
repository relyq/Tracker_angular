import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Ticket } from 'src/app/core/models/ticket';
import { TicketService } from 'src/app/core/services/ticket.service';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  pipe,
  startWith,
  Subject,
  take
} from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { keydown } from 'src/app/shared/components/globals';
import { TypesService } from 'src/app/core/services/types.service';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss']
})
export class TicketEditComponent implements OnInit {
  edit: boolean = false;
  ticket: Ticket = {
    id: 0,
    projectId: parseInt(this.route.snapshot.url[1].path),
    title: '',
    description: '',
    priority: 1,
    type: 'Issue',
    status: 'open',
    assigneeId: '',
    submitterId: ''
  };
  ticketOld?: Ticket;
  users!: User[];
  filteredUsers!: User[];
  types!: string[];
  keydown: Function = keydown;

  searchSubject: Subject<string> = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private ticketService: TicketService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private typeService: TypesService,
    private _ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((filterString) => {
        this.getUsers(filterString).subscribe((res) => {
          this.filteredUsers = (res.users as User[]).filter((u) => {
            return (
              u.id != this.authService.deletedUser &&
              u.id != this.authService.unassignedUser
            );
          });
        });
      });

    this.getUsers().subscribe((res) => {
      if (this.route.snapshot.url[3].path === 'edit') {
        this.edit = true;
        this.getTicket();
        this.ticketOld = this.ticket;
      }

      this.users = res.users;
      this.users = this.users.filter((u) => {
        return (
          u.id != this.authService.deletedUser &&
          u.id != this.authService.unassignedUser
        );
      });

      this.getTypes();
    });
  }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  getUsers(filter?: string): Observable<any> {
    return this.userService.getUsers(
      this.authService.getOrganization(),
      undefined,
      undefined,
      undefined,
      filter
    );
  }

  getTypes(): void {
    this.typeService.getTypes().subscribe((res) => {
      this.types = res;
    });
  }

  getTicket(): void {
    const id = Number(this.route.snapshot.paramMap.get('ticketid'));
    this.ticketService
      .getTicket(id)
      .subscribe((ticket) => (this.ticket = ticket));
  }

  onSubmit = () => {
    this.edit ? this.editTicket() : this.createTicket();
  };

  createTicket(): void {
    this.ticket.submitterId =
      this.authService.getInfo()[this.authService.userIdClaim];

    this.ticketService.postTicket(this.ticket).subscribe((t) => {
      this.goBack();
    });
  }

  editTicket(): void {
    this.ticketService.putTicket(this.ticket).subscribe(() => this.goBack());
  }

  displayFn(userId: string) {
    return this.users.find((u) => u.id === userId)?.username as string;
  }

  goBack(): void {
    let backRoute: string = this.edit
      ? '/project/' + this.ticket.projectId + '/ticket/' + this.ticket.id
      : '/project/' + this.ticket.projectId;
    this.router.navigate([backRoute]);
  }

  filter(username: string): void {
    const filterUsername = username.toLowerCase();

    this.searchSubject.next(filterUsername);
  }
}
