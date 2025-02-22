import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT as unknown as number,
  DB: process.env.DB as string,
  SECRET_KEY: process.env.SECRET_KEY as string
};