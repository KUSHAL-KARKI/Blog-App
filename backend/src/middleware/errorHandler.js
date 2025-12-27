export class CustomError extends Error {
    constructor( message ,{status = 500 , code = "INTERNAL_SERVER_ERROR" , details = null} = {}) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        this.code = code;
        this.details = details; 
    }
}

export class BadRequestError extends CustomError {
    constructor( message=" Bad Request", details) {
        super(message, { status: 400, code: "BAD_REQUEST", details });
    }
}
export class UnauthorizedError extends CustomError {
    constructor( message=" Unauthorized", details) {
        super(message, { status: 401, code: "UNAUTHORIZED", details });
    }
}
export class ForbiddenError extends CustomError {
    constructor( message=" Forbidden", details) {
        super(message, { status: 403, code: "FORBIDDEN", details });
    }
}
export class NotFoundError extends CustomError {
    constructor( message=" Not Found", details) {
        super(message, { status: 404, code: "NOT_FOUND", details });
    }
}
export class ConflictError extends CustomError {
    constructor( message=" Conflict", details) {
        super(message, { status: 409, code: "CONFLICT", details });
    }
}
export class InternalServerError extends CustomError {
    constructor( message=" Internal Server Error", details) {
        super(message, { status: 500, code: "INTERNAL_SERVER_ERROR", details });
    }
}