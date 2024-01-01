import { Component, inject } from '@angular/core';
import { LoggerService } from '../../shared/services/logger.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { fetchReadme } from '../../store/github/readme/readme.actions';
import {
  selectReadme,
  selectReadmeError,
  selectReadmeLoading,
} from '../../store/github/readme/readme.selectors';
import { CommonModule } from '@angular/common';
import { ReadmeComponent } from '../../components/readme/readme.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ReadmeComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  private store = inject(Store<AppState>);
  private logger = inject(LoggerService);

  readme$ = this.store.select(selectReadme);
  readmeIsLoading$ = this.store.select(selectReadmeLoading);
  readmeError$ = this.store.select(selectReadmeError);

  constructor() {
    this.fetchReadme();
  }

  ngOnInit(): void {
    this.logger.log('AboutComponent initialized');
  }

  ngOnDestroy(): void {
    this.logger.log('AboutComponent destroyed');
  }

  private fetchReadme(): void {
    this.store.dispatch(fetchReadme());
  }
}
