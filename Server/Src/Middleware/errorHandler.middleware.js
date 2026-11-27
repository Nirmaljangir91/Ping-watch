module.exports = (err, req, res, next) => {
    let status = err.statusCode || 500;
    let message = err.message || "Internal Server Error";


    //Duplicate key error (email already exists)
    if(err.code === 11000) {
        status = 409;
        const field = Object.keys(err.keyValue || {})[0] || 'value';
        message = `${field} already exists.`;    
    }

    // Mongoose validation error 
    if(err.name === "ValidationError") {
        status = 400;
        message = Object.values(err.errors).map((e) => e.message).join(',  ');
    }

    // Invalid ObjectId error eg. /monitor/abc
    if(err.name === "CastError") {
        status = 400;
        // message = `Invalid Id provided for ${err.path}.`;
        message = 'Invalid Id provided.';
    }


    //zod validation error 
    if(err.name === 'ZodError') {
        status = 400;
        message = err.issues.map((i) => i.message).join(',  ');
    }


    //JWT error 
    if(err.name === 'JsonWebTokenError') {
        status = 401;
        message = 'Invalid token or expired token.';
    }

    //Hide internal server error message in production
    if(process.env.NODE_ENV === 'production' && status === 500) {
        message = 'Internal Server Error.';
    }

    if(status === 500) {
        console.error(err);
    }

    res.status (status).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
    
};