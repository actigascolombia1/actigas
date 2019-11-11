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

    sendMail() {
        let mailOptions = {
            from: "noreply@localhost.test",
            to: this.to,
            subject: this.subject,
            html: this.message
        };
        const transporter = nodemailer.createTransport({
            host: APP_CONFIGURATION.NODEMAILER.HOST_SMTP,
            port: APP_CONFIGURATION.NODEMAILER.HOST_PORT,
            secure: true,
            auth: {
                user: APP_CONFIGURATION.NODEMAILER.SMTP_USERNAME,
                pass: APP_CONFIGURATION.NODEMAILER.SMTP_PASSWORD
            },
            tls: {rejectUnauthorized: false}
        });
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return error;
            } else {
                return true;
            }
        });
    }
}

export default new Mail;