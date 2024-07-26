import { Response, Request, NextFunction } from "express";

/**
 * Handles validation errors by extracting and formatting error messages.
 * @param {Error} error - The error object containing validation errors.
 * @param {Response} response - The Express response object.
 */
const handleValidationErrors = (error: any, response: Response) => {
    const errors = Object.values(error.errors).map(
        (element: any) => element.message
    );
    if (errors.length > 1) {
        const errorMessages = errors.join(" || ");
        response.status(400).send({ msg: errorMessages });
    } else {
        response.status(400).send({ msg: errors[0] });
    }
};

/**
 * Middleware to handle different types of errors.
 * @param {Error} error - The error object.
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */
const handleTypeError = (error: any, request: Request, response: Response, next: NextFunction) => {
    if (error.name === "ValidationError") {
        handleValidationErrors(error, response);
    } else if (error.code === 11000) {
        response.status(400).send({ msg: "field must be unique" });
    } else {
        response.status(500).send({ msg: "There was a problem", error: error.message });
    }
};

export { handleTypeError };
