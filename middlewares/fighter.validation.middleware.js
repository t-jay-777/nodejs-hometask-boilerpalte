const { fighter } = require('../models/fighter');

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
    
    try{
        if(!req.body.health) {
            req.body.health = 100;
        }
        //validate if all fielsds exists
        validateFieldsExist(req.body);
        //validate fighter exists
        validateFighterExists(req.body);
        validateName(req.body);
        validateHealth(req.body);
        validatePower(req.body);
        validateDefense(req.body);
    } catch (error) {
        res.status(400).error = error;
    } finally {
        next();
    }
}

function validateFieldsExist (el) {
    const {id, ...keys} = fighter;
    const reqKeys = Object.keys(keys).sort().join();
    const existKeys = Object.keys(el).sort().join();

    if(reqKeys !== existKeys) {
        throw new Error("Expected or Unexpected fields");
    }
}
function validateName(name) {
    if (name.name.lenght < 1) {
        throw new Error('Name value is empty');
    }
}

function validateFighterExists (el) {
    return FighterSevice.search({name: el.name});
    // if (FighterSevice.search({name: el.name})) {
    //     throw `This name ${el.name} already used`;
    // }
}

function validateHealth(el) {
    if (el.health < 80 || body.health > 120 || isNaN(body.health)) {
        return false;
    }
    return true;
}

function validatePower(el) {
    if(el.power < 1 || el.power > 100 || isNaN(el.power)) {
        return false;
    }
    return true;
}

function validateDefense(el) {
    if(el.defense < 1 || el.defense > 10 || isNaN(el.defense)) {
        return false;
    }
    return true;
}

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update
    try {
        let isUpdate = false;
        const {id, ...keys} = fighter;
        const bodyKeys = Object.keys(req.body);

        if (!FighterSevice.search({id: req.params.id})) { 
            throw `There is no fighter with id ${req.params.id}`;
        }

        bodyKeys.forEach((el) => {
            if (!keys.hasOwnProperty(el)) {
                throw `Unexpected ${el} fields`;
            }
        });

        if (req.body.name) {
            validateName(req.body);
            isUpdate = true;
        } 

        if (req.body.health) {
            validateHealth(req.body);
            isUpdate = true;
        } 

        if (req.body.power) {
            validatePower(req.body);
            isUpdate = true;
        } 

        if (req.body.defense) {
            validateDefense(req.body);
            isUpdate = true;
        } 
        
        if(!isUpdate) {
            throw 'No one filds to update';
        }
        
    } catch (error) {
        res.status(400).error = error;
    } finally {
        next();
    }
    next();
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;