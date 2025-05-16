import moviesModel from "../models/movies.js"

import { v2 as cloudinary } from "cloudinary"
import { config } from "../config.js"

cloudinary.config({
    cloud_name: config.cloudinary.name,
    api_key: config.cloudinary.API_key, 
    api_secret: config.cloudinary.API_secret,
})

const moviesController = {};

//SELECT
moviesController.getMovies = async (req, res) => {
    const movies = await moviesModel.find();
    res.json(movies);
}

//INSERT
moviesController.postMovies = async (req, res) => {
    //datos
    const { titulo, descripcion, director, genero, anio, duracion } = req.body;
    //imagen
    let imageURL = ""

    if(req.file){
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "public",
                allowed_formats: ["png", "jpg", "jpeg", "mov"]
            }
        )
        imageURL = result.secure_url
    }

    const newMovie = new moviesModel({ titulo, descripcion, director, genero, anio, duracion, imageURL})
    newMovie.save()

    res.json({ message: "movie saved" })
}

//DELETE
moviesController.deleteMovies = async (req, res) => {
    const deleteMovie = await moviesModel.findByIdAndDelete(req.params.id);
    if(!deleteMovie){
        return res.status(404).json({ message: "Movie not found"})
    }
    res.json({ message: "Movie deleted" });
}

//UPDATE
moviesController.putMovies = async (req, res) => {
    //datos
    const { titulo, descripcion, director, genero, anio, duracion } = req.body;
    //imagen
    let imageURL = ""

    if(req.file){
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "public",
                allowed_formats: ["png", "jpg", "jpeg", "mov"]
            }
        )
        imageURL = result.secure_url
    }
    await moviesModel.findByIdAndUpdate(
        req.params.id,
        {
            titulo, 
            descripcion, 
            director, 
            genero, 
            anio, 
            duracion, 
            imageURL
        },
        { new: true }
    );
    res.json({ message: "Movie Updated" })
}

export default moviesController;