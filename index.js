const express=require('express');
const { Client } = require('pg');
const client = new Client({
    user: 'squad1',
    host: '3.143.104.1',
    database: 'bootcamp',
    password: 'Squ@d456',
    port: 5432,
});
client.connect(function(err){
  if (err) throw err;
  console.log('connected..');
});

const db = require('./queries')

const app=express()

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
 app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(3000, () => console.log('listening on port 3000...'));