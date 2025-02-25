class CustomError extends Error {
    static httpStatusCodes = {
        200: "OK",
        201: "Created",
        204: "No Content",
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        409: "Data conflict",
        500: "Internal Server Error",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Timeout",
    };

    constructor(message, statusCode = 500, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.status = CustomError.httpStatusCodes[statusCode] || "Unknown Error";
        this.operational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError