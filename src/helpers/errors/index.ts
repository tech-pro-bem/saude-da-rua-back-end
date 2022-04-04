/* eslint-disable max-classes-per-file */
type DefaultErrorInput = {
    code: number;
    name: string;
    generalErrorMessage: string;
    mainErrorMessage: string;
};

class DefaultError extends Error {
    code: number;

    generalErrorMessage: string;

    mainErrorMessage: string;

    constructor({
        code,
        name,
        generalErrorMessage,
        mainErrorMessage,
    }: DefaultErrorInput) {
        super(mainErrorMessage);
        this.code = code;
        this.name = name;
        this.generalErrorMessage = generalErrorMessage;
        this.mainErrorMessage = mainErrorMessage;
    }
}

class AuthenticationError extends DefaultError {
    constructor(mainErrorMessage: string) {
        super({
            code: 401,
            name: 'AuthenticationError',
            generalErrorMessage: 'Failed to Authenticate',
            mainErrorMessage,
        });
    }
}

class AuthorizationError extends DefaultError {
    constructor(mainErrorMessage: string) {
        super({
            code: 403,
            name: 'AuthorizationError',
            generalErrorMessage: 'Failed to Authorize Admin account',
            mainErrorMessage,
        });
    }
}

class NotFoundError extends DefaultError {
    constructor(mainErrorMessage: string) {
        super({
            code: 404,
            name: 'NotFoundError',
            generalErrorMessage: 'Failed to search',
            mainErrorMessage,
        });
    }
}

class ConflictError extends DefaultError {
    constructor(mainErrorMessage: string) {
        super({
            code: 409,
            name: 'ConflictError',
            generalErrorMessage: 'Failed to add data or files',
            mainErrorMessage,
        });
    }
}

class ValidationError extends DefaultError {
    constructor(mainErrorMessage: string) {
        super({
            code: 422,
            name: 'ValidationError',
            generalErrorMessage: 'Failed to validate body',
            mainErrorMessage,
        });
    }
}

class UnknownError extends DefaultError {
    constructor() {
        super({
            code: 418,
            name: 'UnknownError',
            generalErrorMessage: 'Unknown error',
            mainErrorMessage: 'Unknown error',
        });
    }
}

export {
    DefaultError,
    AuthenticationError,
    AuthorizationError,
    NotFoundError,
    ConflictError,
    ValidationError,
    UnknownError,
};
