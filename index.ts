import "reflect-metadata";

import { Request, Response } from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });

import app from "./server";

const handle = nextApp.getRequestHandler();

(async () => {
  try {
    await nextApp.prepare();

    app.getServer().get("*", (req: Request, res: Response) => {
      if (req.path.includes("api") == false) return handle(req, res);
    });
    app
      .listen()
      .then(() => {})
      .catch((error: any) => {
        console.log(error);
      });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
