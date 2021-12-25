const responseMiddleware = (req, res, next) => {
   // TODO: Implement middleware that returns result of the query
    if (res.error) {
        res.json({
            error: true,
            message: res.error
        });
    }
    next();
}

exports.responseMiddleware = responseMiddleware;