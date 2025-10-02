const {
    body,
    validationResult
} = require("express-validator");

const createCarValidation = [
    body("make")
    .notEmpty().withMessage("Make is reddddddquired")
    .isString().withMessage("Make must be a string"),
    body("model")
    .notEmpty().withMessage("Model is required")
    .isString().withMessage("Model must be a string"),
    body("year")
    .notEmpty().withMessage("Year is required")
    .isInt({
        min: 1886
    }).withMessage("Year must be a valid number"), // first car ~1886
    body("price")
    .optional()
    .isFloat({
        min: 0
    }).withMessage("Price must be a positive number"),
    body("miles")
    .optional()
    .isFloat({
        min: 0
    }).withMessage("Miles must be a positive number"),
    body("classification")
    .notEmpty().withMessage("Classification is required")
];

const updateCarValidation = () => {
    return [
        body("make").optional().isString().withMessage("Make must be a string"),
        body("model").optional().isString().withMessage("Model must be a string"),
        body("year").optional().isInt({
            min: 1886
        }).withMessage("Year must be a valid number"),
        body("price").optional().isFloat({
            min: 0
        }).withMessage("Price must be a positive number"),
        body("miles").optional().isFloat({
            min: 0
        }).withMessage("Miles must be a positive number"),
        body("classification").optional().isString().withMessage("Classification must be a string")
    ];
};


function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }
    next();
}

module.exports = validate;


module.exports = {
    createCarValidation,
    updateCarValidation,
    validate
};