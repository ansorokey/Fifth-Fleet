const { validationResult } = require('express-validator');

const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if( !validationErrors.isEmpty() ) {
        const errors = {};
        validationErrors
            .array()
            .forEach(e => errors[e.path] = e.msg );

        const err = Error('Bad Request');
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad Request';

        //  If errors, move on to next error handler
        next(err);
    }

    // if no errors, move on to next middleware
    next();
}

module.exports = { handleValidationErrors };
