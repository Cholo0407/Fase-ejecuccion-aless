import express from "express";
import customersController from "../controllers/customersController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

//configurar una carpeta local que guarde 
//el registro de las imagenes subidas

router
  .route("/")
  .get(customersController.getCustomers)

router
  .route("/:id")
  .put(customersController.putCustomers)
  .delete(customersController.deleteCustomers)

export default router;