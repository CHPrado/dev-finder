import { celebrate, Segments, Joi } from "celebrate";
import express from "express";

import { DevController } from "./controller";

class Routes {
  public routes: express.Router;

  public constructor() {
    this.routes = express.Router();

    this.setRoutes();
  }

  private setRoutes() {
    this.routes.get("/devs", DevController.index);

    this.routes.get(
      "/devs/:username",
      celebrate({
        [Segments.PARAMS]: Joi.object().keys({
          username: Joi.string().required(),
        }),
      }),
      DevController.show
    );

    this.routes.post(
      "/devs",
      celebrate({
        [Segments.BODY]: Joi.object().keys({
          username: Joi.string().required(),
          notes: Joi.string().allow(null, ""),
        }),
      }),
      DevController.save
    );
  }
}

export default new Routes().routes;
