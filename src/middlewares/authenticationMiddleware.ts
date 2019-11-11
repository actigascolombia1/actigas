/**
 * ==================================================================
 * Copyright © Dinámica Digital S.A.S.
 * Author: Neyib Alexander Daza Guerrero
 * Email: dev.alexander.daza@gmail.com
 * ==================================================================
 */
import {NextFunction, Request, Response} from "express";

class AuthenticationMiddleware {

    /**
     * Middleware encargado de validar la sesión de un usuario en el sistema y permitir o denegar el acceso a un recurso
     *
     * @param req
     * @param res
     * @param next
     */
    public async authentication(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        let session = req.session.user;
        if (!session) res.redirect('/login');
        else next();
    }

}

export const authenticationMiddleware = new AuthenticationMiddleware();