const express = require('express');
const cors = require('cors');
require('dotenv').config()

const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// mongoose.set('strictQuery', false); 
const port = process.env.PORT || 5000

const app = express();
// app.use(express.json());
app.use(cors(corsOptions)); //cors origin

app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: "50mb"}));
// app.use(express.json({limit: "50mb"}));
// app.use(express.urlencoded({limit: "50mb", extended: true}));

app.get('/', (req, res) => {
  res.send('ITP Backend API Running');
})

connectMongoDB().then(() => console.log("MongoDB connected")).catch(err => console.log(err));

async function connectMongoDB() {
  await mongoose.connect(process.env.MONGO_DB_URI);
}

app.use('/uploads', express.static("uploads"))

app.use('/api/auth', require('./route/auth.route'))

app.use('/api/ticket', require('./route/ticket.route'));
app.use('/api/tour', require('./route/tour.route'));
app.use('/api/inquiry', require('./route/inquiry.route'));
app.use('/api/guidepackage', require('./route/guidePack.route'));
app.use('/api/guide', require('./route/guide.route'));
app.use('/api/spaceProvider', require('./route/spaceProvider.route'));
app.use('/api/space', require('./route/space.route'));
app.use('/api/user', require('./route/user.route'));
app.use('/api/payment', require('./route/payment.route'));
app.use('/api/EmpPayDetail', require('./route/EmpPayDetail.route'));

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})