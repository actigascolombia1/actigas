/**
 * ==================================================================
 * Copyright © Dinámica Digital S.A.S.
 * Author: Neyib Alexander Daza Guerrero
 * Email: dev.alexander.daza@gmail.com
 * ==================================================================
 */

import {Request, Response} from 'express';
import {APP_CONFIGURATION} from '../config/config';
import nodeGeocoder from 'node-geocoder';
import fs from 'fs';
import nodemailer from 'nodemailer';
// @ts-ignore
import randomToken from 'random-token';
// @ts-ignore
import generateSeialKey from 'generate-serial-key';

/**
 * Class for Dynamic basic helpers
 */
class Helpers {

    request: Request;
    response: Response;
    geocoderOptions: any;

    /**
     * Helpers construct
     * @param req
     * @param res
     */
    constructor(req: Request, res: Response) {
        this.request = req;
        this.response = res;
        // Geocoder options
        this.geocoderOptions = {
            provider: 'google',
            httpAdapter: 'https',
            apiKey: 'AIzaSyA98Y2dw9qdS0ngphh9glpDLiRuY-EcB3I',
            formatter: null
        };
    }

    /**
     * Helper for manager all console outputs in Dynamic Framework
     * @param logType
     * @param logMessage
     * @param logObject
     * @param timerLog
     */
    public static DFLogger(logType: string, logMessage: string, logObject: any = null, timerLog: boolean = false): void {
        if (APP_CONFIGURATION.APP.CONSOLE_LOG) {
            if (timerLog) console.time('TimerForDynamicFramework');
            switch (logType) {
                case 'info':
                    console.info(`[${APP_CONFIGURATION.APP.APP_NAME}]: ${logMessage}`);
                    if (logObject !== null) {
                        console.info(`[${APP_CONFIGURATION.APP.APP_NAME}] Object JSON: ${logMessage}`);
                        console.info(`[${APP_CONFIGURATION.APP.APP_NAME}] Object String: ${JSON.stringify(logMessage)}`);
                    }
                    break;
                case 'error':
                    console.error(`[${APP_CONFIGURATION.APP.APP_NAME}]: ${logMessage}`);
                    if (logObject !== null) {
                        console.error(`[${APP_CONFIGURATION.APP.APP_NAME}] Object JSON: ${logMessage}`);
                        console.error(`[${APP_CONFIGURATION.APP.APP_NAME}] Object String: ${JSON.stringify(logMessage)}`);
                    }
                    break;
                case 'debug':
                    console.debug(`[${APP_CONFIGURATION.APP.APP_NAME}]: ${logMessage}`);
                    if (logObject !== null) {
                        console.debug(`[${APP_CONFIGURATION.APP.APP_NAME}] Object JSON: ${logMessage}`);
                        console.debug(`[${APP_CONFIGURATION.APP.APP_NAME}] Object String: ${JSON.stringify(logMessage)}`);
                    }
                    break;
                default:
                    console.log(`[${APP_CONFIGURATION.APP.APP_NAME}]: ${logMessage}`);
                    if (logObject !== null) {
                        console.log(`[${APP_CONFIGURATION.APP.APP_NAME}] Object JSON: ${logMessage}`);
                        console.log(`[${APP_CONFIGURATION.APP.APP_NAME}] Object String: ${JSON.stringify(logMessage)}`);
                    }
                    break;
            }
            if (timerLog) console.timeEnd('TimerForDynamicFramework');
        }
    }

    /**
     * Helper for global JSON Response
     * @param statusCode
     * @param statusMessage
     * @param statusDescription
     * @param devErrorDescription
     * @param data
     */
    public JSONResponse(statusCode: number, statusMessage: string, statusDescription?: string, devErrorDescription?: any, data?: any): void {
        let response = {
            statusCode: statusCode,
            statusMessage: statusMessage,
            statusDescription: (statusDescription === undefined) ? '' : statusDescription,
            devErrorDescription: (devErrorDescription === undefined) ? '' : devErrorDescription,
            data: (data === undefined) ? {} : data,
        };
        this.response.status(response.statusCode).send(response);
    }

    /**
     * Método encargado de redireccionar al usuario a la página de error del sistema
     *
     * @param errorCode
     * @param frontType
     */
    public sendExceptionResponse(errorCode: number = 500) {
        switch (errorCode) {
            case 404:
                this.response.render('web/errorView', {
                    errorCode: 404,
                    errorTitle: 'No encontramos nada...',
                    errorMessage: 'Aparentemente, la página o el recurso que estás solicitando ya no existe o fue movido a otra ubicación',
                });
                break;
            case 500:
                this.response.render('web/errorView', {
                    errorCode: 500,
                    errorTitle: 'Algo malo ha sucedido',
                    errorMessage: 'Parece que estamos teniendo problemas para procesar tu solicitud. Inténtalo nuevamente y si el problema persiste, por favor contácta con nuestro equipo de soporte técnico',
                });
                break;
            default:
                this.response.render('web/errorView', {
                    errorCode: 500,
                    errorTitle: 'Algo malo ha sucedido',
                    errorMessage: 'Parece que estamos teniendo problemas para procesar tu solicitud. Inténtalo nuevamente y si el problema persiste, por favor contácta con nuestro equipo de soporte técnico',
                });
                break;
        }
    }

    /**
     * Método encargado de enviar una respuesta JSON para el API
     *
     * @param error
     * @param errorCode
     */
    public sendApiExceptionResponse(error?: any, errorCode: number = 500) {
        switch (errorCode) {
            case 500:
                this.JSONResponse(500, 'Internal Serer Error', 'Hubo un error al procesar tu solicitud. ¡Inténtalo nuevamente!', error, {});
                break;
            case 404:
                this.JSONResponse(404, 'Not found', 'La iniformación que buscas, no ha sido encontrada.', error, {});
                break;
        }
    }

    /**
     * Método encargado de enviar una respuesta JSON en caso de que un parámetro requerido no se encuentre en la validación del controlador
     *
     * @param message
     * @constructor
     */
    public JSONResponseValidateParameter(message: string) {
        this.JSONResponse(
            APP_CONFIGURATION.HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY.CODE,
            APP_CONFIGURATION.HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY.MESSAGE,
            message
        )
    }

    /**
     * Método encargado de generar un token random
     * @param length
     */
    public async generateSecureToken(length: number = 16): Promise<string> {
        return await randomToken(length);
    }

    /**
     * Método encargado de generar una nueva llave de licnecia
     * @param length
     */
    public async generateSerialKey(length: number = 25) {
        return generateSeialKey.generate(length, '-', 5);
    }

    /**
     * Método encargado de sumar días a una fecha y retornar la fecha final
     * @param date
     * @param amount
     */
    public async addDaysToDate(date: Date, amount: number) {
        let tzOff = date.getTimezoneOffset() * 60 * 1000,
            t = date.getTime(),
            d = new Date(),
            tzOff2;
        t += (1000 * 60 * 60 * 24) * amount;
        d.setTime(t);
        tzOff2 = d.getTimezoneOffset() * 60 * 1000;
        if (tzOff !== tzOff2) {
            t += tzOff2 - tzOff;
            d.setTime(t);
        }
        return d;
    }

    /**
     * Método encargado de agregar meses a una fecha y retornar la fecha final
     *
     * @param date
     * @param months
     */
    public async addMonthsToDate(date: Date, months: number) {
        return new Date(date.setMonth(date.getMonth() + months));
    }

    /**
     * Método encargado de calcular la diferencia de días entre dos fechas
     * @param startDate
     * @param endDate
     */
    public async daysBetweenTwoDates(startDate: Date, endDate: Date) {
        let oneDay = 24 * 60 * 60 * 1000;
        return Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / (oneDay)));
    }

    /**
     * Método encargado de validar uno o varios roles de usuario
     * @param userRoles
     * @param req
     * @param res
     * @param roles2Validate
     */
    public async validateRoles(userRoles: any, req: Request, res: Response, roles2Validate: string) {
        let rolesToValidate = [];
        if (roles2Validate.indexOf(',') > -1) {
            rolesToValidate = await roles2Validate.split(',');
        } else {
            rolesToValidate.push(roles2Validate);
        }
        let roles = userRoles;
        let found = 0;
        for (let role of rolesToValidate) {
            if (await roles.includes(role)) {
                found = found + 1;
            }
        }
        return (found > 0);
    }

    /**
     * Método encargado de limpiar un string y convertirlo a un subdominio válido dentro del sistema
     * @param subdomain
     */
    public async cleanSubDomain(subdomain: string): Promise<any> {
        return subdomain.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
    }

    /**
     * Método encargado de convertir una dirección en latitud y longitud
     * @param address
     */
    public async addressToLatLong(address: string) {
        let geocoder = nodeGeocoder(this.geocoderOptions);
        return await geocoder.geocode(address);
    }

    /**
     * Método encargado de convertir una imagen cargada con Multer en base64
     *
     * @param fileName
     */
    public async imageToBase64(fileName: string) {
        try {
            let bitmap = fs.readFileSync(fileName);
            let imageEncoded = new Buffer(bitmap).toString('base64');
            imageEncoded = `data:image/jpeg;base64,${imageEncoded}`;
            fs.unlinkSync(fileName);
            return imageEncoded;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Método encargado de generar un número aleatorio
     *
     * @param min
     * @param max
     */
    public async randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Método encargado de calcular porcentajes de valor
     *
     * @param value
     * @param percentage
     */
    public calculatePercentageFromValue(value: any, percentage: number) {
        let discount = (percentage * value) / 100;
        return {
            fullValue: parseInt(value),
            discountValue: discount,
            valueWithDiscount: parseInt(value) - discount
        };
    }

    /**
     * Método encargado de enviar correos electrónicos
     *
     * @param to
     * @param subject
     * @param html
     */
    public async sendMail(to: string, subject: string, html: string) {
        try {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: APP_CONFIGURATION.NODEMAILER.GMAIL.GMAIL_USERNAME,
                    pass: APP_CONFIGURATION.NODEMAILER.GMAIL.GMAIL_PASSWORD
                }
            });

            let mailOptions = {
                from: APP_CONFIGURATION.NODEMAILER.GMAIL.GMAIL_USERNAME, // sender address
                to: to,
                subject: subject,
                html: html
            };

            transporter.sendMail(mailOptions, function (err: any, info: any) {
                if (err) {
                    console.log(err);
                    return false;
                } else {
                    console.log('Email enviado');
                }

            });
            return true;
        } catch (e) {
            console.log(`Método de envío de correos electrónicos`);
            console.log(JSON.stringify(e));
        }
    }

    /**
     * Método encargado de hashear un dato a base64
     *
     * @param string
     */
    public async encodeToBase64(string: string){
        try {
            return await Buffer.from(string).toString('base64');
        } catch (e) {
            console.log(`Método de hasheo a base64`);
            console.log(JSON.stringify(e));
        }
    }

    /**
     * Método encargado de decodificar un string base64
     *
     * @param base64
     */
    public async decodeFromBase64(base64: string){
        try {
            return await Buffer.from(base64, 'base64').toString();
        } catch (e) {
            console.log(`Método de hasheo a base64`);
            console.log(JSON.stringify(e));
        }
    }

    public validateParameter (message: string) {
        this.request.flash('error', message);
    }

}

export default Helpers;