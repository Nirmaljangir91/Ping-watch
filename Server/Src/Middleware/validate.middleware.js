const ApiError = require("../Utills/ApiError.Util.js");

const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errors = result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }));

            return next(
                new ApiError(
                    400,
                    "Validation Failed",
                    errors
                )
            );
        }

        req.body = result.data;

        next();
    };
};

export default validate;