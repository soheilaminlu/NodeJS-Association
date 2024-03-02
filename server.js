//----EXPRESS CONFIG
const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//IMPORT ERROR HANDLLING MIDDLEWARE
const {notFoundError} = require('./middlewares/errorhandlling/Notfound')
//SOCKET-IO CONFIG
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

app.use((req , res  , next)=>{
    req.io = io;
    next()
})

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  
    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      // Add logic to handle user disconnection if needed
    });
  });

//CORS CONFIGS
const cors = require('cors')
const corsOptions = {
    creadential:true , 
    origin:'http//:localhost:3000'
}
app.use(cors(corsOptions))

//---USE COOKIE-PARSER
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//----IMPORT ROUTES
const authRoutes = require('./routes/users/AuthRoutes');
const membersRoutes = require('./routes/users/MembersRoutes')
const ownersRoutes = require('./routes/users/OwnersRoutes');
const adminRoutes = require('./routes/users/AdminRoutes');



//----CONFIG DATABASE
const dbConfig = require('./configs/Mongo');
dbConfig();
 


//----ROUTES CONFIG
app.use('/api' , authRoutes)
app.use('/api/members' , membersRoutes)
app.use('/api/owner' , ownersRoutes)
app.use('/api/admin' , adminRoutes)


//  app.use('*' , notFoundError)


server.listen(5000 , (req , res) =>{
console.log('Server Connected')
})