import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/shared/components/globals';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  private typesUrl = baseUrl + '/api/types';

  constructor(private http: HttpClient) {}

  getTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.typesUrl);
  }
}
