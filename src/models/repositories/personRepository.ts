/**
 * ==================================================================
 * Copyright © Dinámica Digital S.A.S.
 * Author: Neyib Alexander Daza Guerrero
 * Email: dev.alexander.daza@gmail.com
 * ==================================================================
 */

import PersonModel, {Person} from '../personModel';
import Helpers from "../../libs/helpers";

class PersonRepository {

    /**
     * Método encargado de crear una nueva persona en el sistema
     *
     * @param firstName
     * @param lastName
     * @param phone
     * @param mobilePhone
     * @param address
     * @param email
     * @param profilePicture
     * @param user
     */
    public async storeNewPerson(
        firstName: string,
        lastName: string,
        phone: string,
        mobilePhone: string,
        address: string,
        email: string,
        profilePicture: string,
        user: string
    ) {
        try {
            let person: Person[] = await PersonModel.find({email: email});
            if (person.length <= 0) {
                let newPerson = {
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    mobilePhone: mobilePhone,
                    address: address,
                    email: email,
                    profilePicture: profilePicture,
                    user: user
                };
                let person: Person = new PersonModel(newPerson);
                let personCreated:Person = await person.save();
                return personCreated;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
            Helpers.DFLogger('error', 'Hubo un error al almacenar la nueva persona', e);
        }
    }

    public async checkIfPersonExist (userId: string){
        try {
            let person = await PersonModel.findOne({user: userId});
            return (person);
        } catch (e) {
            console.log(e);
            Helpers.DFLogger('error', 'Hubo un error al almacenar la nueva persona', e);
        }
    }

}

export const personRepository = new PersonRepository();