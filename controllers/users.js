const User = require('../models/users');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

const connUri = process.env.PSQL_LOCAL_CONN_URL;
let result = {};

seq = new sequelize(connUri); //connect to db
module.exports = {
    add: (req,res) => {
       
        const {username, email, password} = req.body;
       
        User.create({
            username: username,
            email: email,
            password: password
        }).then(() => {
            console.log("New user created")
        })
        .catch((err) => {
            console.log("You have an error", err);
        });
    },

    login: (req,res) => {

        const { username, password } = req.body;
        let status = 200;
        User.findOne({
            where: {
                username: username
            }
        })
        .then( (user) => {
            if(!user)
            {
                console.log('user null');
            }
            else if (!user.validPassword(password))
            {
                console.log("invalid password");
            }
            else
            {
                //create token
                console.log(user);
                const payload = {user: user.dataValues.username};
                const options = {expiresIn: '2d', issuer: 'bryanramos.xyz'};
                const secret = process.env.JWT_SECRET; //.env file
                const token = jwt.sign(payload, secret, options);
                //save token and user data
                result.token = token;
                result.result = user;
                result.status = status;
                res.status(status).send(result);
            }
        })
        .catch((err) => console.log(err));
    },

    getAll: ( req,res) => {

        //get the payload, verify that the user is admin
        const payload = req.decoded;
        let result = {};
        let status = 200;
        if(payload && payload.user == 'admin')
        {
            console.log("found it");
            User.findAll().then((users) => {
                result.result = users;
                result.status = status
                res.status(status).send(result)
            });
        }
        else //user not authenticated 
        {
            console.log("error?");
            status = 401;
            result.status = status;
            result.error = 'Authentication error';
        }
    }
}