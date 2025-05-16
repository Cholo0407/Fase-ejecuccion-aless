import employeesModel from "../models/employees.js";
const employeesController = {};

//SELECT
employeesController.getEmployees = async (req, res) =>{
    const employee = await employeesModel.find();
    res.json(employee);
}

//DELETE
employeesController.deleteEmployees = async (req, res) =>{
    const deleteEmployee = await employeesModel.findByIdAndDelete(req.params.id)
    if(!deleteEmployee){
        return res.status(404).json({ message: "employee not found" });
    }
    res.json({ message: "employee deleted" });
}

//UPDATE
employeesController.putEmployees = async (req, res) =>{
    const { nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, DUI } = req.body
    await employeesModel.findByIdAndUpdate(
        req.params.id,
        {
            nombre, 
            correo, 
            contrasenia, 
            telefono, 
            direccion, 
            puesto, 
            fecha_contratacion, 
            salario, 
            DUI
        },
        {new: true}
    );
    res.json({message: "employee updated"})
}

export default employeesController