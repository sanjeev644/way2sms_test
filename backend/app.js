require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
// Mongo Connection
mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
global.__basedir = __dirname;
app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));
const initRoutes = require("./src/routes");
initRoutes(app);


app.listen(process.env.PORT,() => {
 
  console.log(`app listing on port ${process.env.PORT}`);

});

module.exports = app;