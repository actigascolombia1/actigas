/**
 * ==================================================================
 * Copyright © Dinámica Digital S.A.S.
 * Author: Neyib Alexander Daza Guerrero
 * Email: dev.alexander.daza@gmail.com
 * ==================================================================
 */

import * as bcrypt from 'bcrypt-nodejs';
import UserModel, {User} from "../userModel";
import Helpers from "../../libs/helpers";
import PersonModel, {Person} from "../personModel";
import moment from 'moment';
import {APP_CONFIGURATION} from "../../config/config";
import jwt from 'jwt-simple';

class UserRepository {

    /**
     * Método de repositorio encargado de almacenar un nuevo usuario en el sistema
     *
     * @param email
     * @param password
     * @param roles
     */
    public async storeNewUser(email: string, password: string, roles: string[] = []) {
        try {
            let user: User[] = await UserModel.find({email: email});
            if (user.length <= 0) {
                email = email.toLowerCase();
                let salt = bcrypt.genSaltSync(6);
                let plainPassword = password;
                password = await bcrypt.hashSync(password, salt);
                let userRoles = (roles.length > 0) ? roles : ['ROLE_AGENT'];
                let data = {
                    email: email,
                    plainPassword: plainPassword,
                    password: password,
                    salt: salt,
                    roles: userRoles,
                    recovery: null,
                    enabled: true
                };
                let userModel: User = new UserModel(data);
                let userStored: User = await userModel.save();
                return userStored;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
            Helpers.DFLogger('error', 'Hubo un error al almacenar el nuevo usuario en el repositorio', e);
        }
    }

    /**
     * Método encargado de consultar si un usuario existe en el sistema para validar el login
     *
     * @param email
     * @param password
     */
    public async checkPasswords(email: string, password: string) {
        try {
            let user = await UserModel.findOne({email: email});
            if (!user) return false;
            if (!user.enabled) return false;
            if (bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
            Helpers.DFLogger('error', 'Hubo un error al almacenar el nuevo usuario en el repositorio', e);
        }
    }

}

export const userRepository = new UserRepository();