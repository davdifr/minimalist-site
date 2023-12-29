export interface GitHubRepository {
  name: string;
  description: string;
  html_url: string;
  language: string;
  topics: string[];
}

export interface GitHubUser {}

export interface GitHubError {
  status: number;
  message: string;
}
