import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { observable, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from 'src/app/shared/components/globals';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsUrl = baseUrl + '/api/projects';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(this.projectsUrl + '/' + id);
  }

  postProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, project);
  }

  putProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.projectsUrl + '/' + project.id, project);
  }

  patchProject(project: Project): Observable<Project> {
    const patchDoc: Array<{ op: string; path: string; value: any }> = [
      {
        op: 'replace',
        path: this.projectsUrl + '/' + project.id,
        value: project
      }
    ];
    return this.http.patch<Project>(this.projectsUrl + '/' + project.id, {
      patchDoc
    });
  }

  deleteProject(id: number): Observable<Object> {
    return this.http.delete(this.projectsUrl + '/' + id);
  }
}
