const router = require("express").Router();
const invCont = require("../controllers/invController");
const utilities = require("../utilities");



router.get("/users/api/cars/:id", utilities.handleErrors(invCont.getOneCar));

router.get("/users/api/cars", utilities.handleErrors(invCont.getAllCars));

router.post("/users/api/cars/create", utilities.handleErrors(invCont.createCars));

router.put("/users/api/cars/edit/:id", utilities.handleErrors(invCont.editCars));

router.delete("/users/api/cars/delete/:id", utilities.handleErrors(invCont.deleteCars));


module.exports = router;