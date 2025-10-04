const router = require("express").Router();
const invController = require("../controllers/invController");
const isAuthenticated = require("../utilities/authenticate");

router.get("/create", isAuthenticated, invController.buildCreateCars);

router.get("/edit/:id", isAuthenticated, invController.buildEditCars);

// route.get("/:id", contactController.getOneContact);

module.exports = router;