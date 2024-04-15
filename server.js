const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/blog', (req, res) => {
  res.send('Hello Blog, My name is Parth.')
})


mongoose.connect("mongodb+srv://pkhillan:Khillanji416!@cluster0.8szw8tv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
  console.log('Connected to MongoDB')

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}).catch(() => {
  console.log('error')
});

