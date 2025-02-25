import CustomError from "./customErrorHandler.js"

const devErrorHandler = (error, res) => {
    res.status(error.statusCode).json({
        success: false,
        status: error.status,
        message: error.message,
        details: error.details ?? undefined,
        stackTRace: error.stack,
        error
    })
}

const prodErrorHandler = (error, res) => {

    if (error.operational) {
        res.status(error.statusCode).json({
            success: false,
            status: error.status,
            message: error.message,
            details: error.details ?? undefined
        })
    } else {
        res.status(500).json({
            success: 'false',
            message: "Uncaught Error occured",
            details: error.details ?? undefined
        })
    }
}

const duplicatedDataHandler = (error) => {
    error.statusCode = 409
    const field = Object.keys(error.keyPattern)[0];
    const value = Object.values(error.keyValue)[0];
    error.message = `Duplicate field value: ${field}. Please use another value.`;
    error.details = {
        field, value
    }
    return new CustomError(error.message, error.statusCode, error.details)
}

const globalErrorHandler = (error, req, res, next) => {

    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (error.code === 11000)
        error = duplicatedDataHandler(error)

    if (process.env.NODE_ENV === 'development')
        devErrorHandler(error, res)

    if (process.env.NODE_ENV === 'production')
        prodErrorHandler(error, res)
}

// Listen for uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Unhandled promise rejections
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1);
});

export default globalErrorHandler