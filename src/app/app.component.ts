import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SessionManagementService } from './shared/services/session-managment.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  #sessionManagementService = inject(SessionManagementService);
  #router = inject(Router);

  ngOnInit(): void {
    this.#sessionManagementService.storageEventSubject.subscribe(() => {
      if (this.#sessionManagementService.isCurrentSessionActive()) {
      }
    });
  }

  ngOnDestroy(): void {
    this.#sessionManagementService.storageEventSubject.unsubscribe();
  }
}
