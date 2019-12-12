/**
 * ==================================================================
 * Copyright © Dinámica Digital S.A.S.
 * Author: Neyib Alexander Daza Guerrero
 * Email: dev.alexander.daza@gmail.com
 * ==================================================================
 */
import {Request, Response} from "express";
import Helpers from "../../libs/helpers";

class IndexController {

    public async indexAction (req: Request, res: Response){
        let helpers = new Helpers(req, res);
        try {
            res.render('web/indexView');
        } catch (e) {
            Helpers.DFLogger('error', e);
            helpers.sendExceptionResponse();
        }
    }

}

export const indexController = new IndexController();