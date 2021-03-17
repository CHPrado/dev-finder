import { Request, Response } from "express";

import connection from "../database/connection";
import { DevProps } from "../interfaces";

interface CustomRequest extends Request {
  body: DevProps;
}

export default {
  async index(request: Request, response: Response): Promise<Response> {
    const dev = await connection<DevProps>("devs").select("*");

    return response.json(dev);
  },

  async show(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const dev = await connection<DevProps>("devs")
      .where("username", "=", String(username).toUpperCase())
      .select("*")
      .first();

    return response.json(dev);
  },

  async save(request: CustomRequest, response: Response): Promise<Response> {
    const { username, notes } = request.body;

    await connection<DevProps>("devs")
      .insert({
        username: username.toUpperCase(),
        notes,
      })
      .onConflict("username")
      .merge();

    return response.json({ message: "Notes saved!", username, notes });
  },
};
