const Joi = require('joi');
const User = require('../models/User');

exports.findAll = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}

exports.findById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).send(`User with ID ${req.params.id} not found`);
        }
        res.send(user);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send(error.message);
    }
}

exports.createUser = async (req, res) => {

    const { error } = validateUser(req.body, res);
    
    if (error) {    
        console.error(error);
        return res.status(400).send(error.details[0].message);
    }
    const user = new User({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: parseInt(req.body.age)
    });

    try {
        const saved = await user.save();
        res.status(201).send(saved);
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}

exports.updateUser = async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send(`User with ID ${req.params.id} not found`);
        }
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = parseInt(req.body.age);

        const saved = await user.save();
        res.status(201).send(saved);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send(error.message);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const removed = await User.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch (error) {
        console.error(error.message);
        return res.status(404).send(`User with ID ${req.params.id} not found`);
    }
}

function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        age: Joi.number().integer().positive().min(18).required()
    });

    return schema.validate(user);
}
