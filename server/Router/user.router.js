const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const User = require('../models/user.model');

require('dotenv').config();
const SECURITY_KEY = process.env.SECURITY_KEY;

//generates the token value
const generateToken = () => {
    const randomToken = require('random-token').create(SECURITY_KEY);
    return randomToken(50);
}

//fetches all users for displaying list of users in frontend
router.post('/get_all_users', jsonParser, (req, res) => {
    if(!req.body.key) res.status(403).json("Permission denied.")
    else{
        const key = req.body.key;
        if(toString(key) != toString(SECURITY_KEY)) res.status(403).json("Permission denied.")
        else{
            User.find({})
            .then(users => {
                let name = []
                users.forEach(user => {
                    name.push(user.email) //only sends the email ids of users to the frontend
                })
                res.json(name);
            })
            .catch(err => res.status(500).json("Error: "+err));
        }
    }
})

//gets the user info using token in cookie
router.post('/get_by_token/', (req, res) => {
    const key = req.body.SECURITY_KEY;
    if(toString(key) != toString(SECURITY_KEY)) res.status(403).json("Permission denied.")
    else{
        User.findOne({token: req.body.token}, (err, user) => {
            if(err)res.status(500).json("Error: "+err);
            else if(!user) res.status(404).json("User not found.")
            else{
                user.token = generateToken();
                user.save()
                .then(() => res.json(user))
                .catch(err => res.status(500).json("Error: "+err));
            }
    })
}})

//to fetch the user based on id

router.post('/get_by_id/', (req, res) => {
    if(!req.body.key) res.status(403).json("Permission denied.")
    else{
        const key = req.body.key;
        if(toString(key) != toString(SECURITY_KEY)) res.status(403).json("Permission denied.")
        User.findById(req.body.id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json("Error: "+err));
    }
})

//register new user
router.post('/register', jsonParser, (req, res) => {
    const {name, password, email} = req.body;
    User.findOne({email}, (err, user) => {
        if(err) res.status(500).json("Error has occured. Please refresh page")
        else if(user) res.status(400).json("Email has been token.")
        else{
                const token = generateToken();
                const newUser = new User({name, password, email, token});
                newUser.save()
                .then(() => {
                    res.json({"Message": "Success", token});
                })
                .catch(err => res.status(500).json(err));
            }
        })
    }
)

//login using email password
router.post('/login', jsonParser, (req, res) => {
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if(err) res.status(500).json("Error has occured.");
        else if(!user) res.status(400).json("User not found");
        else{
            user.comparePassword(password, (err, isMatch)=> {
                if(err) res.status(500).json("Error is occured.")
                if(isMatch){
                    const token = generateToken();
                    user.token = token; //sends token which is saved as cookie in frontend
                    user.save();
                    res.json({"message": "Success", token});
                }
                else res.status(400).json("Password doesn't match")
            })
        }
    })
})

//update user route
//TODO implement frontend for this feature
router.post('/update', jsonParser, (req, res) => {
    const token = req.body.token;
    if(!token) res.status(403).json("Permission denied.")
    else{
        User.findOne({token: token, email: req.body.email}, (err, user) => {
            if(err) res.status(500).json("Something went wrong.")
            else if(!user) res.status(404).json("User not found.")
            else{
                const token = generateToken();
                user.token = token;
                user.email = req.body.new_email;
                user.name = req.body.name;
                user.save()
                .then(() => res.json({message:"Updated", user}))
                .catch(err => res.status(500).json(err));
            }
        })
    }
})

module.exports = router;