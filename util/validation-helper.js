const Joi = require('joi');
const errors = require('restify-errors');


exports.validateCreateUserRequest = function validateCreateUserRequest(req, res, next) {
    const schema = Joi.object().keys({
        userName: Joi.string().required().min(5).max(30).error(new Error('Please enter a valid userName!')),
        passWord: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().error(new Error("Please enter a valid Password!")),
        confirmPassWord: Joi.any().valid(Joi.ref('passWord')).required().error(new Error("Password and Confirm password does not match!")),
    });

    
    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request req.query against schema
    const { body } = req;
  //  console.log("Query Request => " + JSON.stringify(body));
    const { error, value } = schema.validate(body, options);    
    
    if (error) {
        // on fail return comma separated errors
      //  console.log("\n\n\n\n\ I am in error part \n\n\n\n")
        return next(res.send(error.message));
    } else {
        req.body = value;
        next();
    }    
}

exports.authUserRequest = function authUserRequest(req, res, next) {
    const schema = Joi.object().keys({
        userName: Joi.string().required().error(new Error('Please enter a valid userName!')),
        passWord: Joi.string().required().error(new Error("Please enter a valid Password!")),
    });

    
    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request req.query against schema
    const { body } = req;
 //   console.log("Query Request => " + JSON.stringify(query));
    const { error, value } = schema.validate(body, options);    
    
    if (error) {
        // on fail return comma separated errors
        console.log("\n\n\n\n\ I am in error part \n\n\n\n")
        return next(res.send(error.message));

       // return next(new errors.InvalidArgumentError(error.message, 'Validation Errors!'));
    } else {
        req.body = value;
        next();
    }    
}

//validate create eth request
exports.authEthRequest = function authEthRequest(req, res, next) {
    const schema = Joi.object().keys({
        userName: Joi.string().required().error(new Error('Please enter a valid userName!')),
        token: Joi.string().required().error(new Error("Please enter a valid Auth Token!")),
    });

    
    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request req.query against schema
    const { body } = req;
 //   console.log("Query Request => " + JSON.stringify(query));
    const { error, value } = schema.validate(body, options);    
    
    if (error) {
        // on fail return comma separated errors
        console.log("\n\n\n\n\ I am in error part \n\n\n\n")
        return next(res.send(error.message));

       // return next(new errors.InvalidArgumentError(error.message, 'Validation Errors!'));
    } else {
        req.body = value;
        next();
    }    
}