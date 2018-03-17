import * as jwt from "jsonwebtoken";
import config from "../../config/env/all";

export class Token {
  public static generateToken(email: string, pass: string): Token {
      return new Token(email, pass);
  }

  public readonly value: string;

  constructor(email: string, pass: string) {
    this.value = jwt.sign({ email: (email), pass: (pass) }, config.serverToken);
  }
}
