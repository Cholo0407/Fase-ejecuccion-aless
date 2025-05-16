import express from "express";
import registerCustomersController from "../controllers/registerCustomersController.js"
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .post(registerCustomersController.registerCustomer)

export default router;