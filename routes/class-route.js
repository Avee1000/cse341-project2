const router = require("express").Router();
const invCont = require("../controllers/invController");
const utilities = require("../utilities");
const classificationValidation = require("../utilities/classification-validator.js");
const isAuthenticated = require("../utilities/authenticate");


router.get("/users/api/type", utilities.handleErrors(invCont.getAllClassifications));

router.post(
    "/users/api/type/create",
    isAuthenticated,
    classificationValidation.createClassificationValidation,
    classificationValidation.validate,
    invCont.createClassification);

router.put(
    "/users/api/type/edit/:id",
    isAuthenticated,
    classificationValidation.updateClassificationValidation(),
    classificationValidation.validate,
    invCont.editClassification);

router.delete("/users/api/type/delete/:id",
    isAuthenticated,
    invCont.deleteClassification
);


module.exports = router;