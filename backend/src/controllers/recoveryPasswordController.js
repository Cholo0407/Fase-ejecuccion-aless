import jsonwebtoken from "jsonwebtoken"; //Token
import bcryptjs from "bcryptjs"; //Encriptar

import clientsModel from "../models/customers.js";
import employeesModel from "../models/employees.js";

import { sendEmail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovery.js";
import { config } from "../config.js";

const passwordRecoveryController = {};

passwordRecoveryController.requestCode = async (req, res) =>{
    const { email } = req.body;

    try {
        let userFound;
        let userType;

        userFound = await clientsModel.findOne({ correo: email });
        if (userFound) {
            userType = "customer";
        } else {
            userFound = await employeesModel.findOne({ correo: email });
        if (userFound) {
            userType = "employee";
        }
        }

        if (!userFound) {
            return res.json({ message: "User not found" });
        }

        //generar codigo random
        const code = Math.floor(10000 + Math.random() * 90000).toString();

        //TOKEN
        const token = jsonwebtoken.sign(
            {email, code, userType, verified: false},
            config.JWT.secret,
            {expiresIn: "15m"}
        );

        res.cookie("tokenRecoveryCode", token, {maxAge: 15 * 60 * 1000});

        //Enviar el correo con el codigo
        await sendEmail(
            email,
            "Your requested password reset code",
            "Hello! if you didn't ask for this code change your password",
            HTMLRecoveryEmail(code)
        )

        res.json ({message: "Email Sent!"})
    } catch (error) {
        console.log("error: "+error)
    }
}

passwordRecoveryController.verifyCode = async (req, res) =>{
    const { code } = req.body;

    try {
        //Sacar el token de las cookies
        const token = req.cookies.tokenRecoveryCode;

        //Extraer la información del token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if (decoded.code !== code) {
            return res.json({ message: "Invalid code" });
        }

        //Marcar el token como verificado
        const newToken = jsonwebtoken.sign(
        {
          email: decoded.email,
          code: decoded.code,
          userType: decoded.userType,
          verified: true,
        },
        config.JWT.secret,
        { expiresIn: "20m" }
      );
  
      res.cookie("tokenRecoveryCode", newToken, { maxAge: 20 * 60 * 1000 });
  
      res.json({ message: "Code verified successfully" });
    } catch (error) {
        console.log("error: "+error);
    }
}

export default passwordRecoveryController;