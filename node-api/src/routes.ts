import { celebrate, Segments, Joi } from "celebrate";
import express from "express";

import { DevsController } from "./controller";

class Routes {
  public routes: express.Router;

  public constructor() {
    this.routes = express.Router();

    this.setRoutes();
  }

  private setRoutes() {
    this.routes.get("/devs", DevsController.index);

    this.routes.get(
      "/devs/:username",
      celebrate({
        [Segments.PARAMS]: Joi.object().keys({
          username: Joi.string().required(),
        }),
      }),
      DevsController.show
    );

    this.routes.post(
      "/devs",
      celebrate({
        [Segments.BODY]: Joi.object().keys({
          username: Joi.string().required(),
          notes: Joi.string().allow(null, ""),
        }),
      }),
      DevsController.save
    );
  }
}

export default new Routes().routes;
