interface DevProps {
  username: string;
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  location: string;
  followers: number;
  following: number;
  public_repos: number;
  stars: number;
  watchers: number;
  forks: number;
  languages: {
    name: string;
    count: number;
    percent: string;
  }[];
  notes: string;
}

interface DevApiProps {
  id: number;
  username: string;
  notes: string;
}

export type { DevProps, DevApiProps };
