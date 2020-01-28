/**
 * ==================================================================
 * Copyright © Dinámica Digital S.A.S.
 * Author: Neyib Alexander Daza Guerrero
 * Email: dev.alexander.daza@gmail.com
 * ==================================================================
 */
import {Request, Response} from "express";
import Helpers from "../../libs/helpers";
import Mail from "../../services/mail";

class IndexController {

    /**
     * Método encargado de renderizar la landing page del sitio web
     *
     * @param req
     * @param res
     */
    public async indexAction(req: Request, res: Response) {
        let helpers = new Helpers(req, res);
        try {
            res.render('web/indexView');
        } catch (e) {
            Helpers.DFLogger('error', e);
            helpers.sendExceptionResponse();
        }
    }

    /**
     * Método encargado de renderizar la página de contacto
     *
     * @param req
     * @param res
     */
    public async contactAction(req: Request, res: Response) {
        let helpers = new Helpers(req, res);
        try {
            let service = req.params.service;
            let serviceArray = service.split('-');
            let serviceStr = '';
            for (const serv of serviceArray) {
                serviceStr += `${serv} `;
            }
            serviceStr = serviceStr.substring(0, serviceStr.length - 1).toUpperCase();
            console.log(serviceStr);
            res.render('web/contactView', {
                service: serviceStr
            });
        } catch (e) {
            Helpers.DFLogger('error', e);
            helpers.sendExceptionResponse();
        }
    }

    /**
     * Método encargado de procesar una solicitud de contacto
     *
     * @param req
     * @param res
     */
    public async storeContact(req: Request, res: Response) {
        let helpers = new Helpers(req, res);
        try {
            let {fullName, phone, email, subject, message} = req.body;
            let messageMail = `
            <h3>Nueva solicitud de contacto en Actigas</h3>
            <p>Hola! Has recibido una nueva solicitud de contacto para el servicio: ${subject}.</p>
            <br>
            <p>Nombres: ${fullName}</p>
            <p>Teléfono/Celular: ${phone}</p>
            <p>Email: ${email}</p>
            <p>Mensaje: ${message}</p>
            <br>
            <small>Por favor, no respondas este mensaje ya que fue enviado automáticamente</small>
            `;
            await Mail.sendMail('dev.alexander.daza@gmail.com', subject, messageMail);
            helpers.JSONResponse(201, 'Contact created', 'Hemos recibido su mensaje y pronto le contactaremos');
        } catch (e) {
            console.log(e);
            helpers.sendExceptionResponse();
        }
    }

}

export const indexController = new IndexController();
