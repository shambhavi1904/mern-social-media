require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const SocketServer = require('./socketServer');

const app = express();

// ✅ FIXED CORS
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//#region // !Socket
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
  SocketServer(socket);
});
//#endregion

//#region // !Routes
app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/userRouter'));
app.use('/api', require('./routes/postRouter'));
app.use('/api', require('./routes/commentRouter'));
app.use('/api', require('./routes/adminRouter'));
app.use('/api', require('./routes/notifyRouter'));
app.use('/api', require('./routes/messageRouter'));
//#endregion

// ✅ MongoDB Connection
const URI = process.env.MONGO_URI;
console.log("TOKEN:", process.env.TOKEN_KEY);
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Database Connected!!"))
.catch(err => console.log(err));

// ✅ Server Start
const port = process.env.PORT || 4000;

http.listen(port, () => {
  console.log("Listening on", port);
});