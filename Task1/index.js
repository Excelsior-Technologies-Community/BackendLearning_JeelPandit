const express = require('express');
const port = 3000;
const app = express();


const users = [
    {
        id:1,
        name: "abc",
        email:"a@gmail.com"
    },
    {
        id:2,
        name: "def",
        email:"d@gmail.com"
    }
]

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users',(req,res) => {
    res.json(users);
})

app.get('/users/:id' ,(req,res) => {
    const uId = parseInt(req.params.id);
    const userData = users.find((user) => user.id === uId);
    res.json(userData);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});