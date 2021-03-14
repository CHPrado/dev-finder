import axios from "axios";

import { DevApiProps } from "../../interfaces";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

const devsApi = {
  async get(username: string) {
    return await api.get<DevApiProps>(`devs/${username}`).then((resp) => {
      return resp?.data;
    });
  },

  async save(username: string, notes: string) {
    return await api.post("devs", { username, notes });
  },
};

export default devsApi;
