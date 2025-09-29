const db = require('../models');
const Classification = db.classification;
const Cars = db.cars;
const mongoose = require('mongoose');

const invCont = {};

// Build form for creating cars
invCont.buildCreateCars = async (req, res, next) => {
    try {
        const classifications = await Classification.find({});
        res.render("account/add", {
            title: "Create Contact",
            classifications,
            errors: null
        });
    } catch (error) {
        console.error("🔥 Error building create cars form:", error);
        next({
            status: 500,
            message: "Server Error"
        });
    }
};

// Build form for editing cars
invCont.buildEditCars = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next({
                status: 400,
                message: "Invalid Car ID"
            });
        }

        const classifications = await Classification.find({});
        const car = await Cars.findById(id);

        if (!car) {
            return next({
                status: 404,
                message: "Car Not Found"
            });
        }

        res.render("inventory/edit-cars", {
            title: "Edit Cars",
            errors: null,
            _id: car._id,
            make: car.make,
            model: car.model,
            year: car.year,
            price: car.price,
            miles: car.miles,
            color: car.color,
            description: car.description,
            image: car.images.main,
            thumbnail: car.images.thumbnail,
            classifications
        });
    } catch (error) {
        console.error("🔥 Error building edit cars form:", error);
        next({
            status: 500,
            message: "Server Error"
        });
    }
};

// Get one car
invCont.getOneCar = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).send("Invalid Car ID");
            return next({
                status: 400,
                message: "Invalid Car ID"
            });
        }

        const car = await Cars.findById(id);
        if (!car) {
            res.status(404).send("Car Not Found");
            return next({
                status: 404,
                message: "Car Not Found"
            });
        }

        res.status(200).json(car);
    } catch (error) {
        console.error("🔥 Error fetching car:", error);
        next({
            status: 500,
            message: "Server Error"
        });
    }
};

// Get all cars
invCont.getAllCars = async (req, res, next) => {
    try {
        const cars = await Cars.find({});
        if (!cars || cars.length === 0) {
            res.status(404).send("No Cars Found");
            return next({
                status: 404,
                message: "No Cars Found"
            });
        }

        res.status(200).json(cars);
    } catch (error) {
        console.error("🔥 Error fetching all cars:", error);
        next({
            status: 500,
            message: "Server Error"
        });
    }
};

// Create a new car
invCont.createCars = async (req, res, next) => {
    try {
        const {
            make,
            model,
            year,
            description,
            price,
            miles,
            color,
            classification
        } = req.body;

        const car = await Cars.create({
            make,
            model,
            year,
            description,
            "images.main": "/images/no-image.png",
            "images.thumbnail": "/images/no-image-tn.png",
            price,
            miles,
            color,
            classification
        });

        if (!car) {
            res.status(400).send("Cannot Create Car");
            return next({
                status: 500,
                message: "Server Error"
            });
        }

        res.status(201).json(car);
    } catch (error) {
        console.error("🔥 Error creating car:", error);
        res.status(400).send(error);
        next({
            status: 500,
            message: error
        });
    }
};

// Edit car
invCont.editCars = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const {
            make,
            model,
            year,
            description,
            image,
            imageThumbnail,
            price,
            miles,
            color,
            classification
        } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).send("Invalid Car ID");
            return next({
                status: 400,
                message: "Invalid Car ID"
            });
        }

        const result = await Cars.findByIdAndUpdate(
            id, {
                $set: {
                    make,
                    model,
                    year,
                    description,
                    "images.main": image,
                    "images.thumbnail": imageThumbnail,
                    price,
                    miles,
                    color,
                    classification
                }
            }, {
                new: true
            }
        );

        if (!result) {
            res.status(500).send("Server Error");
            return next({
                status: 404,
                message: "Car Not Found"
            });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("🔥 Error updating car:", error);
        next({
            status: 500,
            message: "Server Error"
        });
    }
};

// Delete car
invCont.deleteCars = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).send("Invalid Car ID");
            return next({
                status: 400,
                message: "Invalid Car ID"
            });
        }

        const car = await Cars.findByIdAndDelete(id);
        if (!car) {
            return next({
                status: 400,
                message: "Car Not Found"
            });
        }

        res.status(200).json(car);
    } catch (error) {
        console.error("🔥 Error deleting car:", error);
        next({
            status: 500,
            message: "Server Error"
        });
    }
};

module.exports = invCont;