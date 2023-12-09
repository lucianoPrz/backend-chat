import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io'

import __dirname from './utils.js';
import viewsRouter from './routes/views.routes.js'

const PORT = 8080;
let messages = []

const app = express()

const httpServer = app.listen(PORT, ()=>console.log(`Server listening at ${PORT}`))



app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'))

app.use("/", viewsRouter)

const io = new Server(httpServer)

io.on('connection', (socket)=>{

    socket.on('chat-message', (data)=>{
        messages.push(data);

        io.emit("messages", messages);
    })

    socket.on('new-user', (username)=>{
        socket.emit('messages', messages)
        socket.broadcast.emit("new-user", username);
    })
})
