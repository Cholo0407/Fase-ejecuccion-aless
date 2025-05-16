import express from "express";
import employeesController from "../controllers/employeesController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

//configurar una carpeta local que guarde 
//el registro de las imagenes subidas

router
  .route("/")
  .get(employeesController.getEmployees)

router
  .route("/:id")
  .put(employeesController.putEmployees)
  .delete(employeesController.deleteEmployees)

export default router;