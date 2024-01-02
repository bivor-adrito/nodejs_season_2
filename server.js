const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// parse requests of content-type: application/json
app.use(bodyParser.json())


// define a simple route
app.get('/', (req, res) => {
    res.json({message: 'Welcome to my application.'})
})

let users = []
let lastId = 0

// create a user
app.post('/users', (req, res) => {
    const user = req.body
    user.id = ++lastId
    users.push(user)
    res.json(user)
})

// retrieve all users
app.get('/users', (req, res) => {
    res.json(users)
})
// retrieve one users
app.get('/users/:id', (req, res) => {
    const id = req.params.id
    const user = users.find((u) => u.id == id)
    if(user) {
        res.json(user)
    }else{
        res.status(404).json({message: "User not found."})
    }
})


//* Start the Server
const port = 3001
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})