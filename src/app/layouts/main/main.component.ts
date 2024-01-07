import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent, ThemeToggleComponent, RouterOutlet],
  templateUrl: './main.component.html',
})
export class MainComponent {}
