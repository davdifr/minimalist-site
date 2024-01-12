import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SessionManagementService } from './shared/services/session-managment.service';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: ` @if (isCurrentSession) {
    <router-outlet></router-outlet>
    } @else {
    <h1>There is another active session</h1>
    <p>Please close the other session and try again</p>
    }`,
})
export class AppComponent {
  #session = inject(SessionManagementService);
  #theme = inject(ThemeService);

  isCurrentSession: boolean = true;

  ngOnInit(): void {
    this.#session.storageEventSubject.subscribe(() => {
      this.isCurrentSession = this.#session.isCurrentSessionActive();
    });
  }

  ngOnDestroy(): void {
    this.#session.storageEventSubject.unsubscribe();
  }
}
