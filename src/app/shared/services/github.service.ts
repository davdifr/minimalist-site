import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { GitHubRepository, GitHubUser } from '../models/github.models';

/**
 * Service for interacting with the GitHub API.
 */
@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  username: string = environment.api.github.username;
  apiUrl: string = environment.api.github.url;

  constructor(private httpService: HttpService) {}

  /**
   * Retrieves the specified GitHub user.
   * @returns A promise that resolves with the user data.
   * @param username The GitHub username to retrieve.
   */
  getUser(username: string = this.username): Observable<GitHubUser> {
    return this.httpService.get<GitHubUser>(`${this.apiUrl}/users/${username}`);
  }

  /**
   * Retrieves the repositories for the specified GitHub user.
   * @returns A promise that resolves with the repositories data.
   */
  getRepositories(): Observable<GitHubRepository[]> {
    return this.httpService.get<GitHubRepository[]>(
      `${this.apiUrl}/users/${this.username}/repos`
    );
  }
}
