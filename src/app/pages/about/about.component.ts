import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { fetchReadme } from '../../store/github/readme/readme.actions';
import {
  selectReadme,
  selectReadmeAlreadyLoadedOnce,
  selectReadmeError,
  selectReadmeLoading,
} from '../../store/github/readme/readme.selectors';
import { CommonModule } from '@angular/common';
import { ReadmeComponent } from '../../components/readme/readme.component';
import { Observable, first } from 'rxjs';
import { GitHubError, GitHubReadme } from '../../shared/models/github.models';
import { RetryComponent } from '../../components/retry/retry.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ReadmeComponent, RetryComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements OnInit {
  #store: Store<AppState> = inject(Store<AppState>);
  #alreadyLoadedOnce$: Observable<boolean> = this.#store.select(
    selectReadmeAlreadyLoadedOnce
  );

  readme$: Observable<GitHubReadme | null> = this.#store.select(selectReadme);
  isLoading$: Observable<boolean> = this.#store.select(selectReadmeLoading);
  error$: Observable<GitHubError | null> =
    this.#store.select(selectReadmeError);

  ngOnInit(): void {
    this.fetchReadme();
  }

  fetchReadme(): void {
    this.#alreadyLoadedOnce$.pipe(first()).subscribe((initialized) => {
      if (!initialized) {
        this.#store.dispatch(fetchReadme());
      }
    });
  }
}
