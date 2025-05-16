import jsonwebtoken from "jsonwebtoken"; // Token
import bcryptjs from "bcryptjs"; // Encriptar

import employeesModel from "../models/employees.js";
import { config } from "../config.js"

const registerEmployeesController = {};

registerEmployeesController.registerEmployee = async (req, res) => {
    const {
        nombre,
        correo,
        contrasenia,
        telefono,
        direccion,
        puesto,
        fecha_contratacion,
        salario,
        DUI,
    } = req.body;

    try {
        //verificar repeticion
        const existCustomer =  await employeesModel.findOne({ correo });
        if(existCustomer) {
            return res.json({ message: "Email is already registered"})
        }

        //encriptar
        const passwordHash = await bcryptjs.hash(contrasenia, 10);

        //Guardar
        const newCustomer = new employeesModel({
            nombre,
            correo,
            contrasenia: passwordHash,
            telefono,
            direccion,
            puesto,
            fecha_contratacion,
            salario,
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
                
                res.cookie("authTokenEmployee", token)
                res.json({message: "employee registered"})
            }
        )

    } catch (error) {
        console.log("error: "+error)
        res.json({message: "Error saving employee"})
    }
}

export default registerEmployeesController;