import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { observable, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsUrl = 'https://localhost:7004/api/projects';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    const projects = this.http.get<Project[]>(this.projectsUrl);
    return projects;
  }

  getProject(id: number): Observable<Project> {
    const project = this.http.get<Project>(this.projectsUrl + '/' + id);
    return project;
  }

  postProject(project: Project): Project {
    let createdProject!: Project;

    this.http.post<Project>(this.projectsUrl, project).subscribe((res) => {
      createdProject = res;
    });

    return createdProject;
  }

  patchProject(project: Project): void {}

  deleteProject(id: number): void {
    this.http.delete(this.projectsUrl + '/' + id).subscribe();
  }
}
