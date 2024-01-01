import { Injectable, effect, inject, signal } from '@angular/core';
import { StorageService } from './storage.service';

export const storageKey = 'theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private storage = inject(StorageService);
  themeSignal = signal<boolean>(false);
  private path = '/assets/themes';
  private stylesheet = document.getElementById(
    'theme'
  ) as HTMLLinkElement | null;

  constructor() {
    this.initializeThemeFromPreferences();

    effect(() => {
      this.updateRenderedTheme();
    });
  }

  toggleTheme(): void {
    this.themeSignal.update((prev) => !prev);
  }

  private initializeThemeFromPreferences(): void {
    if (!this.stylesheet) {
      this.initializeStylesheet();
    }

    const storedTheme = this.storage.getItem(storageKey);

    if (storedTheme) {
      this.themeSignal.update(() => storedTheme);
    }
  }

  private initializeStylesheet(): void {
    this.stylesheet = document.createElement('link');
    this.stylesheet.id = 'theme';
    this.stylesheet.rel = 'stylesheet';

    document.head.appendChild(this.stylesheet);
  }

  getThemeName(): string {
    return this.themeSignal() ? 'dark' : 'light';
  }

  getToggleLabel(): string {
    return `Switch to ${this.themeSignal() ? 'light' : 'dark'} mode`;
  }

  private updateRenderedTheme(): void {
    if (this.stylesheet) {
      this.stylesheet.href = `${this.path}/${this.getThemeName()}.css`;
    }

    this.storage.setItem(storageKey, this.themeSignal());
  }
}
