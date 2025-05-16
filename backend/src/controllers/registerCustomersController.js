import jsonwebtoken from "jsonwebtoken"; // Token
import bcryptjs from "bcryptjs"; // Encriptar

import customersModel from "../models/customers.js";
import { config } from "../config.js"

const registerCustomersController = {};

registerCustomersController.registerCustomer = async (req, res) => {
    const {
        campos,
        nombre,
        correo,
        contrasenia,
        telefono,
        direccion,
        DUI 
    } = req.body;

    try {
        //verificar repeticion
        const existCustomer =  await customersModel.findOne({ correo });
        if(existCustomer) {
            return res.json({ message: "Email is already registered"})
        }

        //encriptar
        const passwordHash = await bcryptjs.hash(contrasenia, 10);

        //Guardar
        const newCustomer = new customersModel({
            campos,
            nombre,
            correo,
            contrasenia: passwordHash,
            telefono,
            direccion,
            DUI: DUI || null
        });

        await newCustomer.save();

        //TOKEN
        jsonwebtoken.sign(
            {id: newCustomer._id},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},
            (error, token) => {
                if (error) console.log ("error: "+error)
                
                res.cookie("authToken", token)
                res.json({message: "Customer registered"})
            }
        )

    } catch (error) {
        console.log("error: "+error)
        res.json({message: "Error saving customer"})
    }
}

export default registerCustomersController;