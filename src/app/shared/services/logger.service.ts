import { Injectable } from '@angular/core';

/**
 * Service for logging messages.
 */
@Injectable({ providedIn: 'root' })
export class LoggerService {
  /**
   * Logs a message to the console.
   * @param message - The message to be logged.
   */
  log(message: string): void {
    console.log(message);
  }

  /**
   * Logs an error message to the console.
   * @param message - The error message to be logged.
   */
  error(message: string): void {
    console.error(message);
  }

  /**
   * Logs a warning message to the console.
   * @param message - The warning message to be logged.
   */
  warn(message: string): void {
    console.warn(message);
  }
}
