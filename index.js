const express = require('express');
const path = require('path');
const morgan = require("morgan"); 
const dotenv = require('dotenv');
const app = express();

//env
const envPath = path.join(__dirname, 'config.env'); 
const result = dotenv.config({ path: envPath });
if (result.error) {
    throw result.error;
}

//port
const port = process.env.PORT || 3010;

// middleware
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connectdb
const connectDB = require('./db/db');

connectDB();

var hostname = '';

app.get('/',(req,res)=>{
  const hostname = req.hostname;
  console.log(`App listening at http://${hostname}:${port}`);
   res.send(`Express is Listening to you`);
})

//build
// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

// route
app.use("/",require('./routes/routes'));

app.listen(port, () => {
  console.log(`App Running on ${port}`);
});
