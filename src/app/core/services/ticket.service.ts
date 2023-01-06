import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { baseUrl } from 'src/app/shared/components/globals';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketsUrl = baseUrl + '/api/tickets';

  constructor(private http: HttpClient) {}

  getTickets(
    projectId: number,
    status: string,
    limit?: number,
    offset?: number,
    filter?: string,
    sort?: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('projectid', projectId)
      .set('status', status);

    if (limit) {
      params = params.set('limit', limit);
    }
    if (offset) {
      params = params.set('offset', offset);
    }
    if (filter) {
      params = params.set('filter', filter);
    }
    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get(this.ticketsUrl, { params: params });
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
