import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  GitHubReadme,
  GitHubRepository,
  GitHubUser,
} from '../models/github.models';

/**
 * Service for interacting with the GitHub API.
 */
@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  #http = inject(HttpService);
  #username: string = environment.api.github.username;
  #apiUrl: string = environment.api.github.url;

  /**
   * Retrieves the specified GitHub user.
   * @returns A promise that resolves with the user data.
   * @param username The GitHub username to retrieve.
   */
  getUser(username: string = this.#username): Observable<GitHubUser> {
    return this.#http.get<GitHubUser>(`${this.#apiUrl}/users/${username}`);
  }

  /**
   * Retrieves the repositories for the specified GitHub user.
   * @returns A promise that resolves with the repositories data.
   */
  getRepositories(
    username: string = this.#username
  ): Observable<GitHubRepository[]> {
    return this.#http.get<GitHubRepository[]>(
      `${this.#apiUrl}/users/${username}/repos`
    );
  }

  /**
   * Fetches the README.md file of a given repository.
   *
   * This function sends a GET request to the GitHub API to retrieve the README.md file of a repository.
   * If no repository is provided, it defaults to the username stored in the service.
   *
   * @param {string} repository - The name of the repository from which to fetch the README.md file. Defaults to the username of the service.
   * @returns {Observable<string>} An Observable that emits the content of the README.md file as a string.
   */
  getReadme(repository: string = this.#username): Observable<GitHubReadme> {
    return this.#http.get<GitHubReadme>(
      `${this.#apiUrl}/repos/${this.#username}/${repository}/readme`
    );
  }
}
