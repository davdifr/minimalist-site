import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';

/**
 * Service for making HTTP requests.
 */
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  http = inject(HttpClient);

  /**
   * Sends a GET request to the specified URL.
   * @param url - The URL to send the request to.
   * @param params - Optional parameters to include in the request.
   * @returns An Observable that emits the response data of type T.
   */
  get<T>(url: string, params?: any): Observable<T> {
    return this.http.get<T>(url, { params });
  }

  /**
   * Sends a POST request to the specified URL with the given body.
   * @param url - The URL to send the request to.
   * @param body - The body of the request.
   * @returns An Observable that emits the response data.
   */
  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }

  /**
   * Sends a PUT request to the specified URL with the given body.
   * @param url - The URL to send the request to.
   * @param body - The body of the request.
   * @returns An Observable that emits the response data.
   */
  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body);
  }

  /**
   * Sends a DELETE request to the specified URL.
   * @param url - The URL to send the request to.
   * @returns An Observable that emits the response data.
   */
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
