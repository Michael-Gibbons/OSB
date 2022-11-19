// This is a function which generates a middleware function, not middleware itself

function validateServiceParameters(service){
    return (req, res, next) => {
        res.locals.service = service
        next()
    }
}

export default validateServiceParameters

