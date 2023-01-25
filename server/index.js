const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const socketio = require('socket.io');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json())

//setting up cors
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization'
      ]
    })
  );

/////////////////////////////////////////Routers/////////////////////////////////////
const UserRouter = require('./Router/user.router');
const {messageRouter, startMessage, createMessage} = require('./Router/message.router');
const ArchiveRouter = require('./Router/archive.router');
app.use('/users', UserRouter);
app.use('/messages', messageRouter);
app.use('/archives', ArchiveRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))

///////////////////////////////////////////DataBase setup////////////////////////////////////
const URI = process.env.ATLAS_URI;
mongoose.connect(URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

////////////////////////////////////////////sockets/////////////////////////////////////////
io.on('connection', socket => {

    //Added if the recipient is not in user communications list, add them
    //TODO: complete this functionality by add new message feature in frontend
    socket.on('startMessage', ({sender, recipient, token, senderEmail}) => {
        startMessage(sender, token, recipient);
    })

    //emits on sendMessage from frontend
    socket.on('sendMessage', ({sender, recipient, token, message}) => {
        createMessage(sender, token, recipient, message)
        .then(res => {
            io.emit('message', res)
        })
    })
})