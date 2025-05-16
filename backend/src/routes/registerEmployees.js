import express from "express";
import registerEmployeesController from "../controllers/registerEmployeesController.js"
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .post(registerEmployeesController.registerEmployee)

export default router;