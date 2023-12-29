import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  /**
   * Handles HTTP errors.
   * @param error - The HTTP error response.
   * @returns An Error object representing the error.
   */
  handleError(response: HttpErrorResponse) {
    if (response.error instanceof ErrorEvent) {
      console.error('An error occurred:', response.error.message);
    } else {
      console.error(
        `Backend returned code ${response.status}, body was: ${response.error.message}`
      );
    }

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
