/*
    campos
    nombre
    correo
    contrasenia
    telefono
    direccion
    DUI
*/

import { Schema, model } from "mongoose";

const customersSchema = new Schema(
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

export default model("customers", customersSchema);
