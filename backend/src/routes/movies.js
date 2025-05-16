import express from "express";
import moviesController from "../controllers/moviesController.js"
import multer from "multer"
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

//configurar una carpeta local que guarde 
//el registro de las imagenes subidas
const upload = multer({dest: "public/"})

router
  .route("/")
  .get(moviesController.getMovies)
  .post(upload.single("image"), moviesController.postMovies);

router
  .route("/:id")
  .put(upload.single("image"), moviesController.putMovies)
  .delete(moviesController.deleteMovies)

export default router;