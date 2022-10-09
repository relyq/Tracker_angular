import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Ticket } from 'src/app/core/models/ticket';
import { TicketService } from 'src/app/core/services/ticket.service';
import { Router } from '@angular/router';
import { map, Observable, pipe, startWith, take } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { keydown } from 'src/app/shared/components/globals';

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
    type: 'issue',
    status: 'open',
    assigneeId: '',
    submitterId: ''
  };
  ticketOld?: Ticket;
  users!: User[];
  filteredUsers!: User[];
  keydown: Function = keydown;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private ticketService: TicketService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private _ngZone: NgZone
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url[3].path === 'edit') {
      this.edit = true;
      this.getTicket();
      this.ticketOld = this.ticket;
    }
    this.getUsers();
  }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
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
      : '/project/' + this.ticket.projectId + '/ticket/';
    this.router.navigate([backRoute]);
  }

  filter(username: string): void {
    const filterUsername = username.toLowerCase();

    this.filteredUsers = this.users.filter((u) =>
      u.username.toLowerCase().includes(filterUsername)
    );
  }
}
