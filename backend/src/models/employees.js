/* 
    campos
    nombre
    correo
    contrasenia
    telefono
    direccion
    puesto
    fecha_contratacion
    salario
    DUI
*/

import { Schema, model } from "mongoose";

const employeesSchema = new Schema(
    {
        nombre:{
            type: String,
            require: true,
        },
        correo:{
            type: String,
            require: true,
        },
        contrasenia:{
            type: String,
            require: true,
        },
        telefono:{
            type: String,
            require: true,
        },
        direccion:{
            type: String,
            require: true,
        },
        puesto:{
            type: String,
            require: true,
        },
        fecha_contratacion:{
            type: Date,
            require: true,
        },
        salario:{
            type: Number,
            require: true,
        },
        DUI:{
            type: String,
            require: true,
            minlength: [10, 'El DUI debe tener al menos 10 caracteres'],
        }
    },
    {
      timestamps: true,
      strict: false,
    }
)

export default model("employees", employeesSchema);
