import { createMemoryHistory, createLocation } from "history";

import { DevProps, DevRouteProps } from "../interfaces";

const devData: DevProps = {
  username: "CHPrado",
  name: "Christian Prado",
  bio: "My bio",
  avatar_url: "avatar_url",
  location: "Lins - SP",
  followers: 1,
  following: 2,
  public_repos: 3,
  stars: 4,
  watchers: 5,
  forks: 6,
  languages: [
    {
      name: "JavaScript",
      count: 1,
      percent: "49.9",
    },
    {
      name: "Ruby",
      count: 1,
      percent: "51.1",
    },
  ],
  notes: "Notes about me",
};

const devRouteData: DevRouteProps = {
  history: createMemoryHistory(),
  location: createLocation({ state: { dev: devData } }),
  match: {
    isExact: false,
    path: "/dev",
    url: "/dev",
    params: {},
  },
};

export { devData, devRouteData };
