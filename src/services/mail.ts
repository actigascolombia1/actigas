/**
 * ==================================================================
 * Copyright © Dinámica Digital S.A.S.
 * Author: Neyib Alexander Daza Guerrero
 * Email: dev.alexander.daza@gmail.com
 * ==================================================================
 */

import * as nodemailer from "nodemailer";
import {APP_CONFIGURATION} from '../config/config';
import Helpers from "../libs/helpers";

class Mail {

    constructor(
        public to?: string,
        public subject?: string,
        public message?: string) {
    }

    sendMail(com: string, subject: any, messageMail: string) {
        let transporter:any;
        let mailOptions:object;

        if (APP_CONFIGURATION.NODEMAILER.USE_GMAIL) {
            mailOptions = {
                from: APP_CONFIGURATION.NODEMAILER.GMAIL.GMAIL_USERNAME,
                to: this.to,
                subject: this.subject,
                html: this.message
            };
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: APP_CONFIGURATION.NODEMAILER.GMAIL.GMAIL_USERNAME,
                    pass: APP_CONFIGURATION.NODEMAILER.GMAIL.GMAIL_PASSWORD
                }
            });
        } else {
            mailOptions = {
                from: APP_CONFIGURATION.NODEMAILER.DEFAULT.SENDER_EMAIL,
                to: this.to,
                subject: this.subject,
                html: this.message
            };
            transporter = nodemailer.createTransport({
                host: APP_CONFIGURATION.NODEMAILER.DEFAULT.HOST_SMTP,
                port: APP_CONFIGURATION.NODEMAILER.DEFAULT.HOST_PORT,
                secure: true,
                auth: {
                    user: APP_CONFIGURATION.NODEMAILER.DEFAULT.SMTP_USERNAME,
                    pass: APP_CONFIGURATION.NODEMAILER.DEFAULT.SMTP_PASSWORD
                },
                tls: {rejectUnauthorized: false}
            });
        }
        transporter.sendMail(mailOptions, function (err:any, info:any) {
            if(err) {
                Helpers.DFLogger('error', 'Hubo un error al enviar el correo electrónico', err);
                return false;
            } else {
                return true;
            }
        });
    }
}

export default new Mail;
