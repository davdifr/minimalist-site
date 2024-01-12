import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionManagementService {
  storageEventSubject = new BehaviorSubject<StorageEvent | null>(null);

  #currentSessionId: string = '';
  #sessionIds: string[] = [];

  constructor() {
    this.setupStorageEventListener();
    this.#currentSessionId = this.createNewSessionId();
    this.#sessionIds = this.getSessionsFromStorage();

    if (this.#sessionIds.length) {
      this.#sessionIds.push(this.#currentSessionId);
      this.setSessionsToStorage(this.#sessionIds);
    } else {
      this.initializeFirstSession();
    }

    fromEvent(window, 'beforeunload').subscribe(() => {
      const sessions = this.getSessionsFromStorage().filter(
        (session) => session !== this.#currentSessionId
      );
      this.setSessionsToStorage(sessions);
    });
  }

  private setupStorageEventListener(): void {
    window.addEventListener('storage', (event: StorageEvent) => {
      this.storageEventSubject.next(event);
    });
  }

  private createNewSessionId(): string {
    return Date.now().toString();
  }

  private initializeFirstSession(): void {
    this.#sessionIds.push(this.#currentSessionId);
    this.setSessionsToStorage(this.#sessionIds);
  }

  isCurrentSessionActive(): boolean {
    const sessions = this.getSessionsFromStorage();
    return sessions[sessions.length - 1] === this.#currentSessionId;
  }

  private getSessionsFromStorage(): string[] {
    const sessionsInStorage = localStorage.getItem('sessions');
    return sessionsInStorage ? JSON.parse(sessionsInStorage) : [];
  }

  private setSessionsToStorage(sessions: string[]): void {
    localStorage.setItem('sessions', JSON.stringify(sessions));
  }
}
