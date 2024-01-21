const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require('../../middleware/auth')

//* create a user
router.post("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const userObj = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hash,
    };
    const user = new User(userObj);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

//* login a user
router.post("/login", async (req, res) => {
  try {
    const { type, email, password, refreshToken } = req.body;
    if (type == "email") {
      // Step 1: Find the user by email
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(401).json({ message: "User not found" });
      } else {
        // Step3: If user is found match password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          res.status(401).json({ message: "Password is wrong" });
        } else {
          const accessToken = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1m" }
          );
          const refreshToken = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "3m" }
          );
          const userObj = user.toJSON()
          userObj['accessToken']= accessToken
          userObj['refreshToken']= refreshToken
          res.status(200).json(userObj)
        }
      }
    } else {
        if(!refreshToken){
            res.status(401).json({message: 'Refresh token is not defined'})
        }else{
            jwt.verify(refreshToken, process.env.JWT_SECRET, async(err, payload) => {
                if (err) {
                  res.status(401).json({ message: "Unauthorized" });
                  return;
                } else {
                    const id = payload.id
                    const user = await User.findById(id)
                    if(!user){
                        res.status(401).json({ message: "User not found" });
                    }else{
                        const accessToken = jwt.sign(
                            { email: user.email, id: user._id },
                            process.env.JWT_SECRET,
                            { expiresIn: "1m" }
                          );
                          const refreshToken = jwt.sign(
                            { email: user.email, id: user._id },
                            process.env.JWT_SECRET,
                            { expiresIn: "3m" }
                          );
                          const userObj = user.toJSON()
                          userObj['accessToken']= accessToken
                          userObj['refreshToken']= refreshToken
                          res.status(200).json(userObj)
                    }
                }
              })
        }
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

//* get user profile
router.get("/profile", authenticateToken, async (req, res) => {
    try {
      const id = req.user.id;
      const user = await User.findById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User Not Found." });
      }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong." });
    }
  });

//* get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

//* get one user
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User Not Found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});



//* Update One User
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userBody = req.body;
    const newUser = await User.findByIdAndUpdate(id, userBody, { new: true });
    if (newUser) {
      res.json(newUser);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

//* Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res.json({ message: "The user is deleted" });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;
