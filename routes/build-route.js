const router = require("express").Router();
const invController = require("../controllers/invController");

router.get("/create", invController.buildCreateCars);

router.get("/edit/:id", invController.buildEditCars);

// route.get("/:id", contactController.getOneContact);

module.exports = router;