require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

// parse requests of content-type: application/json
app.use(bodyParser.json());

//connect with mongoDB
connectDB();

// routes
app.use("/api/users", require("./routes/api/users")); //? User Route
app.use("/api/tasks", require("./routes/api/tasks")); //? Task Route

// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

// let users = []
// let lastId = 0

// create a user
// app.post('/users', (req, res) => {
//     const user = req.body
//     user.id = ++lastId
//     users.push(user)
//     res.json(user)
// })

// retrieve all users
// app.get('/users', (req, res) => {
//     res.json(users)
// })
// retrieve one users
// app.get('/users/:id', (req, res) => {
//     const id = req.params.id
//     const user = users.find((u) => u.id == id)
//     if(user) {
//         res.json(user)
//     }else{
//         res.status(404).json({message: "User not found."})
//     }
// })

// update a user by specific id
// app.put('/users/:id',(req, res) => {
//     const id = parseInt(req.params.id)
//     const userUpdate = req.body
//     const userIndex = users.findIndex((u)=>u.id == id)
//     if (userIndex !== -1){
//         let user = users[userIndex]
//         user = { ...user, ...userUpdate}
//         res.json(user)
//     }else{
//         res.status(404).json({message: "User not found."})
//     }
// })

// delete a specific user
// app.delete('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     const userIndex = users.findIndex((u) => u.id === id)
//     if(userIndex !== -1){
//         users.splice(userIndex, 1)
//         res.json({message: "User is deleted."})
//     }else{
//         res.status(404).json({message: "User not found."})
//     }
// })

//* Start the Server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
