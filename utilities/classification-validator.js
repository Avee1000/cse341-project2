const {
    body,
    validationResult
} = require("express-validator");

const createClassificationValidation = [
    body("name")
    .notEmpty().withMessage("Classification name is required")
    .isString().withMessage("name must be a string"),
    body("description")
    .notEmpty().withMessage("classification description is required")
    .isString().withMessage("description must be a string")
];

const updateClassificationValidation = () => {
    return [
        body("name")
            .optional().isString().withMessage("name must be a string")
            .notEmpty().withMessage("Classification name is required"),
        
        body("description")
            .optional().isString().withMessage("description must be a string")
            .notEmpty().withMessage("classification description is required")
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


module.exports = {
    createClassificationValidation,
    updateClassificationValidation,
    validate
};