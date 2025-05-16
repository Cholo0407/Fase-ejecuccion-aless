import express from "express";
import cookieParser from 'cookie-parser';

import moviesRoutes from "./src/routes/movies.js"
import employeesRoutes from "./src/routes/employees.js";
import customersRoutes from "./src/routes/customers.js";
import registerCustomersRoutes from "./src/routes/registerCustomers.js"

// Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos en json
app.use(express.json());
//Que postman acepte guardar cookies
app.use(cookieParser());

// Definir las rutas de las funciones que tendrá la página web
app.use("/api/movies", moviesRoutes)
app.use("/api/employees", employeesRoutes)
app.use("/api/customers", customersRoutes)
app.use("/api/register-customer", registerCustomersRoutes)
// Exporto la constante para poder usar express en otros archivos
export default app;
