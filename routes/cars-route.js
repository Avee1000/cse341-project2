const router = require("express").Router();
const invCont = require("../controllers/invController");
const utilities = require("../utilities");
const validation = require("../utilities/validator.js");



router.get("/users/api/cars/:id", utilities.handleErrors(invCont.getOneCar));

router.get("/users/api/cars", utilities.handleErrors(invCont.getAllCars));

router.post(
    "/users/api/cars/create",
    validation.createCarValidation,
    validation.validate,
    utilities.handleErrors(invCont.createCars));

router.put(
    "/users/api/cars/edit/:id",
    validation.updateCarValidation(),
    validation.validate,
    utilities.handleErrors(invCont.editCars));

router.delete("/users/api/cars/delete/:id", utilities.handleErrors(invCont.deleteCars));


module.exports = router;