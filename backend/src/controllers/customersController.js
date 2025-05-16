import customersModel from "../models/customers.js";
const customersController = {};

//SELECT
customersController.getCustomers = async (req, res) =>{
    const customer = await customersModel.find();
    res.json(customer);
}

//DELETE
customersController.deleteCustomers = async (req, res) =>{
    const deleteCustomer = await customersModel.findByIdAndDelete(req.params.id)
    if(!deleteCustomer){
        return res.status(404).json({ message: "customer not found" });
    }
    res.json({ message: "customer deleted" });
}

//UPDATE
customersController.putCustomers = async (req, res) =>{
    const { nombre, correo, contrasenia, telefono, direccion, DUI } = req.body
    await customersModel.findByIdAndUpdate(
        req.params.id,
        {
            nombre, 
            correo, 
            contrasenia, 
            telefono, 
            direccion, 
            DUI
        },
        {new: true}
    );
    res.json({message: "customer updated"})
}

export default customersController