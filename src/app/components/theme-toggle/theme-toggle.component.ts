import { Component, inject } from '@angular/core';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  template: `
    <input
      id="theme-toggle"
      type="checkbox"
      [checked]="isDarkThemeActive()"
      (change)="switchTheme()"
      [attr.aria-label]="getThemeToggleLabel()"
    />
  `,
})
export class ThemeToggleComponent {
  private theme: ThemeService = inject(ThemeService);

  switchTheme(): void {
    this.theme.toggleTheme();
  }

  isDarkThemeActive(): boolean {
    return this.theme.themeSignal();
  }

  getThemeToggleLabel(): string {
    return this.theme.getToggleLabel();
  }
}
