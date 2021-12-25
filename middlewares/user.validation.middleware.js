const { user } = require('../models/user');
const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    try {
        validateFieldsExist(req.body);
        validateUserName(req.body);
        validateEmail(req.body.email);
        validatePhoneNumber(req.body.phoneNumber);
        validateUserExist(req.body);
        validatePassword(req.body.password);
    } catch (error) {
        res.status(400).error = error;
    } finally {
        next();
    }

    next();
}

function validateFieldsExist (el) {
    const {id, ...keys} = fighter;
    const reqKeys = Object.keys(keys).sort().join();
    const existKeys = Object.keys(el).sort().join();

    if(reqKeys !== existKeys) {
        throw new Error("Expected or Unexpected fields");
    }
}

function validatePassword(pass) {
    if (pass && pass.length < 3) {
        throw 'the password must be at least three characters long';
    }
}

function validateEmail(email) {
    const re = /^[a-z0-9](\.?[a-z0-9]){3,}@[Gg][Mm][Aa][Ii][Ll]\.com$/;
    if (email && !re.test(email)) {
        throw 'Not a valid Gmail email address example: user@gmail.com';
    }
}

function validatePhoneNumber(n) {
    const re = /^\+380\d{9}$/;
    if(n && !re.test(n)) {
        throw 'Not a valid phone number. Phone number should be +380xxxxxxxxx';
    }
}

function validateUserName(name) {
    if(name.lastName.length < 1 && name.lastName.length < 1){
        throw 'Name can`t be empty';
    }
}


const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update
    try {
        const {id, ...keys} = user;
        const existKeys = Object.keys(req.body);

        existKeys.forEach((el) => {
            if (!reqKeys.hasOwnProperty(el)) {
                throw `Unexpected ${el} fields`;
            }
        });

        if (!UserService.search({id: req.params.id})) { 
            throw `There is no user with id ${req.params.id}`;
        }

        if(!isBodyHasFieldToUpdate(existkeys, keys)) {
            throw 'No one filds to update';
        }


        validateUserExist(req.body);
        validateUserName(req.body);
        validatePhoneNumber(req.body.phoneNumber);
        validateEmail(req.body.email);
        validatePassword(req.body.password);

    } catch (error) {
        res.status(400).error = error;
    } finally {
        next();
    }

    next();
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;