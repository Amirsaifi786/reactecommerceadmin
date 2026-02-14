const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req,res)=>{
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if(userExists) return res.status(400).json("User exists");

    const hashed = await bcrypt.hash(password,10);

    const user = await User.create({
        name,
        email,
        password: hashed
    });

    res.json(user);
};
