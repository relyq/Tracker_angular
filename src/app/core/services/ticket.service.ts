import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/app/shared/components/globals';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketsUrl = baseUrl + '/api/tickets';
  private projectsUrl = baseUrl + '/api/projects';

  constructor(private http: HttpClient) {}

  getTickets(projectId: number): Observable<Ticket[]> {
    const tickets = this.http.get<Ticket[]>(
      this.projectsUrl + '/' + projectId + '/tickets'
    );

    return tickets;
  }
  getTicketsMock(): Observable<Ticket[]> {
    const tickets = this.http.get<Ticket[]>(this.ticketsUrl);
    return tickets;
  }

  getTicket(id: number): Observable<Ticket> {
    const ticket = this.http.get<Ticket>(this.ticketsUrl + '/' + id);
    return ticket;
  }

  postTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.ticketsUrl, ticket);
  }

  putTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(this.ticketsUrl + '/' + ticket.id, ticket);
  }

  patchTicket(ticket: Ticket): void {}

  deleteTicket(id: number): Observable<Object> {
    return this.http.delete(this.ticketsUrl + '/' + id);
  }
}
