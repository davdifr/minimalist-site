import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  styleUrl: './not-found.component.css',
  template: `<h1>404 - Not Found</h1>
    <p>
      <a routerLink="/">Go Home</a>
    </p>`,
})
export class NotFoundComponent {}
