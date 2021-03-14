import axios from "axios";

import { devsApi } from "..";

import { DevProps, ReposProps, UserProps } from "../../interfaces";

const api = axios.create({
  baseURL: "https://api.github.com/users/",
});

const getUser = async (name: string) => {
  return await api.get<UserProps>(name).then((resp) => {
    return resp?.data;
  });
};

const getRepos = async (name: string) => {
  return await api.get<ReposProps[]>(`${name}/repos`).then((resp) => {
    return resp?.data;
  });
};

const formatLanguagesData = (
  languages: DevProps["languages"],
  repoLanguage: string
) => {
  const index = languages.findIndex(
    (language) => language.name === repoLanguage
  );

  if (index === -1) {
    if (repoLanguage)
      languages.push({ name: repoLanguage, count: 1, percent: "" });
  } else {
    languages[index].count += 1;
  }
};

const calculateLanguagePercent = (
  languages: DevProps["languages"],
  total: number
) => {
  for (var i in languages) {
    languages[i].percent = ((languages[i].count * 100) / total).toFixed(2);
  }
};

const formatDevData = async (name: string) => {
  const user = await getUser(name);
  const repos = await getRepos(name);
  const notes = await devsApi.get(name).then((dev) => {
    return dev?.notes;
  });

  let stars = 0;
  let watchers = 0;
  let forks = 0;
  let languages: DevProps["languages"] = [];

  for (var i in repos) {
    stars += repos[i].stargazers_count;
    watchers += repos[i].watchers_count;
    forks += repos[i].forks_count;

    formatLanguagesData(languages, repos[i].language);
  }

  calculateLanguagePercent(languages, repos.length);

  return {
    ...user,
    username: user.login,
    stars,
    watchers,
    forks,
    languages,
    notes,
  };
};

const githubApi = {
  async getDev(name: string) {
    return await formatDevData(name);
  },
};

export default githubApi;
