const express = require('express');
const app = express();
const mongoose = require('mongoose');

// var url = 'mongodb://mongo-db:27017/test?authSource=admin'

// var options = {
//     user: "admin",
//     pass: "password"
//   };
// const customerSchema = new mongoose.Schema({ name: String, age: Number, email: String });
// const Customer = mongoose.model('Customer', customerSchema);
// let docs;

// async function run() {
//     await mongoose.connect(url, options);
//     await mongoose.connection.dropDatabase();

//     await Customer.create({ name: 'A', age: 30, email: 'a@foo.bar' });
//     await Customer.create({ name: 'B', age: 28, email: 'b@foo.bar' });

//     // Find all customers
//     docs = await Customer.find();
//     console.log(docs);
// }




app.get('/', (req, res) => {
    // console.log(__dirname)
    // run().catch(error => console.log(error.stack));
    res.send("testing");
    // res.send(docs)
    // Note: __dirname is the current directory you're in. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  })

  app.listen(4000, function() {
    console.log('listening on 4000')
  })