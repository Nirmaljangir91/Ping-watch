const ApiError = require("../Utills/ApiError.Util");

module.exports = (req, res, next) => {
    next(new ApiError(404, "Not Found", "The requested resource was not found on this server."));
}