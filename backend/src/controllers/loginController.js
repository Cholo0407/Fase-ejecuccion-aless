import customersModel from "../models/customers.js";
import employeesModel from "../models/employees.js";
import bcryptjs from "bcryptjs"; // Encriptar
import jsonwebtoken from "jsonwebtoken"; // generar token
import { config } from "../config.js";

const loginController = {}

loginController.login = async (req, res) =>{
    const { email, password } = req.body;

    try {
        //validamos los 3 niveles
        let userFound; //Guarda el usuario encontrado
        let userType; //Guarda el tipo de usuario encontrado

        //1. Admin
        if (
            email === config.ADMIN.emailAdmin &&
            password === config.ADMIN.password
        ) {
            userType = "admin";
            userFound = { _id: "admin" };
        } else {
            //2. empleado
            userFound = await employeesModel.findOne({ correo: email });
            userType = "employee";
            if(!userFound){
                //cliente
                userFound = await customersModel.findOne({ correo: email });
                userType = "customer";
            }
        }

        if(!userFound){
            return res.json({message: "User not found"})
        }

        //validar contraseña
        if(userType !== "admin"){
            const isMatch = await bcryptjs.compare(password, userFound.contrasenia);
            if(!isMatch){
                return res.json({ message: "Invalida password"})
            }
        }

        ////TOKEN
        jsonwebtoken.sign(
            {id: userFound._id, userType},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},
            //Funcion Flecha
            (error, token) => {
                if (error) console.log("error: "+error);
                res.cookie("authToken", token);
                res.json({message: "Login succesful"});
            }
        );
        } catch (error) {
            console.log("error: " + error)
        }
}

export default loginController;