import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Ticket } from '../../../core/models/ticket';
import { TicketService } from '../../../core/services/ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../../../shared/components/modals/delete-modal/delete-modal.component';
import { CommentsComponent } from '../../comments/comments.component';
import { User } from '../../../core/models/user';
import { UserService } from '../../../core/services/user.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { getPriority, urlify } from 'src/app/shared/components/globals';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {
  ticket!: Ticket;
  submitter!: User;
  assignee!: User;
  canEdit: boolean = false;

  urlify: Function = urlify;
  getPriority: Function = getPriority;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private ticketService: TicketService,
    private userService: UserService,
    private authService: AuthService,
    public Modal: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTicket().subscribe((ticket) => {
      this.ticket = ticket;

      this.getUser(this.ticket.submitterId).subscribe((u) => {
        this.submitter = u;
      });
      this.getUser(this.ticket.assigneeId).subscribe((u) => {
        this.assignee = u;
      });

      this.canEdit =
        this.authService.isRole('Administrator') ||
        this.authService.isRole('Developer');
    });
  }

  getTicket(): Observable<Ticket> {
    const id = Number(this.route.snapshot.paramMap.get('ticketid'));
    return this.ticketService.getTicket(id);
  }

  getUser(id: string): Observable<User> {
    return this.userService.getUser(id);
  }

  goBack(): void {
    this.router.navigate(['/project/' + this.ticket.projectId]);
  }

  closeTicket(): void {
    if (this.ticket.closed) {
      this.ticket.closed = undefined;
      this.ticket.status = 'open';
    } else {
      this.ticket.closed = new Date();
      this.ticket.status = 'closed';
    }

    this.ticketService
      .putTicket(this.ticket)
      .subscribe((res) => this.ngOnInit());
  }

  deleteTicket(): void {
    this.Modal.open(DeleteModalComponent, {
      width: '250px'
    })
      .afterClosed()
      .subscribe((res) => {
        if (res && this.ticket.id) {
          this.ticketService.deleteTicket(this.ticket.id).subscribe(() => {
            this.goBack();
          });
        }
      });
  }
}
