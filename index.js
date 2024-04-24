const express = require('express');
const path = require('path');
const morgan = require("morgan"); 
const dotenv = require('dotenv');
const fs = require('fs');
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


app.get('/', (req, res) => {
 
  fs.readFile('swagger.yaml', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading Swagger file:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.get('/swagger.yaml', (req, res) => {
  const filePath = path.join(__dirname, 'swagger.yaml');

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Swagger YAML file not found');
  }

  res.setHeader('Content-Type', 'application/yaml');

  fs.createReadStream(filePath).pipe(res);
});


// route
app.use("/",require('./routes/routes'));

app.listen(port, () => {
  console.log(`App Running on ${port}`);
});
