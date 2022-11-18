const express = require('express')
const app = express()
const port = 4000
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Connection string ----
// mongodb+srv://admin:<password>@cluster0.bjoyv2i.mongodb.net/?retryWrites=true&w=majority


// Library import
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

// Use a connection string to connect to a remote database
// Edit password
async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.bjoyv2i.mongodb.net/?retryWrites=true&w=majority');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

// Generate database schema
const bookSchema = new mongoose.Schema({
  title : String,
  cover : String, 
  author : String
});

// Create bookModel and place it in collection Books
const bookModel = mongoose.model('Books', bookSchema);

// Instantiating bookModel now allows us to communicate with the database application and use methods

const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/books',(req,res)=>{
  console.log(req.body);

  // Create a record passing title, cover and author
  bookModel.create({
    title:req.body.title,
    cover:req.body.cover,
    author:req.body.author
  })
  res.send('Data Recieved');
})

app.get('/api/books', (req, res) => {
  
  // Searches database and retrieves all records from the database
  bookModel.find((error,data)=>{
    res.json(data);
  })

})

app.get('/api/books/:id', (req, res) => {
  console.log(req.params.id);

  // Find a record by an id, once found call out function is executed
  bookModel.findById(req.params.id, (error, data)=>{
    res.json(data);
  })

  res.send('Data');
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})