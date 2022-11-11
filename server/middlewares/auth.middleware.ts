import config from "configs/index";
import { DataStoredInToken, RequestWithUser } from "@interfaces/auth.interface";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import USerService from "@services/users.service";
const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const userService = new USerService();
          console.log("************", req.headers);

    const Authorization =
      (req.headers &&
        req.headers.cookie &&
        req.headers.cookie["authorization"]) ||
      (req.header && req.header("authorization")?.split("Bearer ")[1]) ||
      null;
      console.log("************", req.headers.cookies);
     const apiKey = req.header && req.header("api_key");
   
    if (apiKey == config.apiKey) {
      const user = await userService.getUserByEmail(config.apiKeyUser);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(httpStatus.UNAUTHORIZED).send({
          error: { code: httpStatus.UNAUTHORIZED, message: "Not Authorized" },
        });
      }
    } else if (Authorization) {
      const secretKey: string = config.jwt.secret;
      const verificationResponse = jwt.verify(
        Authorization,
        secretKey
      ) as DataStoredInToken;
      const email = verificationResponse.email;
      const employee = await userService.getUserByEmail(email);
      if (employee) {
        req.user = employee;
        next();
      } else {
        res.status(httpStatus.UNAUTHORIZED).send({
          error: { code: httpStatus.UNAUTHORIZED, message: "Not Authorized" },
        });
      }
    } else {
      res.status(httpStatus.UNAUTHORIZED).send({
        error: { code: httpStatus.UNAUTHORIZED, message: "Not Authorized" },
      });
    }
  } catch (error) {
    res.cookie("authorization", "", {
      expires: new Date(Date.now()),
    });
    res
      .status(httpStatus.UNAUTHORIZED)
      .send({
        error: { code: httpStatus.UNAUTHORIZED, message: "Not Authorized" },
      });
  }
};
export default authMiddleware;
