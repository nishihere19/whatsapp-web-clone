const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const User = require('../models/user.model');
const Message = require('../models/message.model');
const crypto = require('crypto');

require('dotenv').config();
const SECURITY_KEY = process.env.SECURITY_KEY;

//a function to encrypt messages. Decrypt function present in frontend.
const encrypt = (message) => {
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(message);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {iv: iv.toString('hex'), encryptedMessage: encrypted.toString('hex'), key: key.toString('hex')}
}

//creates a new message when send message event is emitted by the sockets
const createMessage = async (sender, userToken, recipient, message) => {
    let _info = null;
    await User.findOne({_id: sender, token: userToken})
    .then(async user => {
        if(user) await User.findOne({email: recipient})
        .then(_user => {
            if(_user){
                if(!_user.communications.includes(sender)){
                    _user.communications.push(sender);
                    _user.save();
                }
                const encryptedMessage = encrypt(message); //encrypts the message before saving it.
                const _message = new Message({recipient: _user._id, sender, iv: encryptedMessage.iv, message: encryptedMessage.encryptedMessage, key: encryptedMessage.key})
                _message.save()
                _info = {
                    recipient: {email: _user.email, id: _user._id}, sender: {email: user.email, id: user._id},
                    iv: encryptedMessage.iv, message: encryptedMessage.encryptedMessage, key: encryptedMessage.key
                }
            }
        })
    })
    return _info;
}

//if the new recipient is not present in the communications list, add the new recipient
const startMessage = async (sender, userToken, recipient) => {
    User.findOne({_id: sender, token: userToken}, (err, user) => {
        if(err) return null;
        else if(!user) return null;
        else{
            User.findOne({email: recipient}, async (err, _user) => {
                if(err) return null;
                else if(!_user) return null;
                else{
                    if(!user.communications.includes(_user._id) && sender !== recipient){
                        user.communications.push(_user._id)
                        await user.save()
                        .then(() => {return true})
                        .catch(() => {return null;})
                    }
                }
            })
        }
    })
}

//fetches the messagers from the user to the target
router.post('/get_messages', jsonParser, (req, res) => {
    const {user, token, target} = req.body;
    User.findOne({_id: user, token}, (err, user) => {
        if(err) res.status(500).json("Something went wrong.");
        else if(!user) res.status(403).json("Permission denied.")
        else{
            User.findOne({email: target}, (err, _user) => {
                if(err) res.status(500).json("Something went wrong.");
                else if(!_user) res.status(404).json("User not found.")
                else{
                    Message.find({sender: user, recipient: _user._id}) //fetches all msgs sent by user to recipient
                    .then(message => {
                        Message.find({sender: _user._id, recipient: user}, (err, _message) => { //fetches all msgs sent by recipient to user
                            if(err) res.status(500).json("Something went wrong.");
                            else{
                                let result = message.concat(_message)
                                //has to sort the messages based on time
                                result.sort((a, b) => { 
                                    return new Date(a.createdAt) - new Date(b.createdAt)
                                });
                                let finalResult = []
                                result.forEach(msg => {
                                    if(String(msg.sender) === String(user._id)){
                                        //sends all data required on frontend to decrypt the message
                                        _info = {
                                            recipient: {email: _user.email, id: _user._id}, sender: {email: user.email, id: user._id},
                                            iv: msg.iv, message: msg.message, key: msg.key,timestamp:msg.createdAt
                                        }
                                    }else{
                                        _info = {
                                            recipient: {email: user.email, id: user._id}, sender: {email: _user.email, id: _user._id},
                                            iv: msg.iv, message: msg.message, key: msg.key,timestamp:msg.createdAt
                                        }
                                    }
                                    finalResult.push(_info)
                                })
                                res.json(finalResult)
                            }
                        })
                    })
                    .catch(() => {res.status(500).json("Something went wrong.");})
                }
            })
        }
    })
})

module.exports = {createMessage, messageRouter: router, startMessage}