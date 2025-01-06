
const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/contact');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors({
  origin: "http://127.0.0.1:5500", 
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', userRouter)


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('server started on port 4000'));