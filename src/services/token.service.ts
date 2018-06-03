import * as jwt from "jsonwebtoken";
import config from "../config/env/all";

export class TokenService {
  public static generateToken(email: string, pass: string): TokenService {
      return new TokenService(email, pass);
  }

  public readonly value: string;

  constructor(email: string, pass: string) {
    this.value = jwt.sign({ email: (email), pass: (pass) }, config.serverToken);
  }
}
