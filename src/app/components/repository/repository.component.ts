import { Component, Input } from '@angular/core';
import { GitHubRepository } from '../../shared/models/github.models';

@Component({
  selector: 'app-repository',
  standalone: true,
  imports: [],
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.css',
})
export class RepositoryComponent {
  @Input({ required: true }) repository: GitHubRepository =
    {} as GitHubRepository;
}
