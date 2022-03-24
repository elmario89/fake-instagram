import middlewares from "../middlewares";
import { signIn } from '../controllers/auth.controller';
import { NextFunction, Request, Response, Application } from "express";

export default function(app: Application) {
    app.use(function(req: Request, res: Response, next: NextFunction) {
        debugger;
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    // app.post(
    //     "/api/auth/signup",
    //     [
    //         verifySignUp.checkDuplicateUsernameOrEmail,
    //         verifySignUp.checkRolesExisted
    //     ],
    //     controller.signup
    // );
    app.post("/api/auth/signIn", signIn);
};