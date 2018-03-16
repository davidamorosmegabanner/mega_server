import {Route} from "../Route";
import * as express from "express";
import {register, update} from "./user.controller";

export default class UserRouter implements Route {
  URL: string = "/user";

  decorate(app: express.Application) {
    app.route(this.URL + '/register').post(register);
    app.route(this.URL + '/update').post(update);
  }

  static create(): Route {
    return new UserRouter();
  }
}
