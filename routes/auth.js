const router = require("express").Router();
const User = require("../model/user");
const { registerValidation, LoginValidation } = require("../validation");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Register
router.post("/register", async (req, res) => {
  //Validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //checking if the user is already in the database
  const emailExist = await User.findOne({email : req.body.email});
  if (emailExist){
      return res.status(400).send('email already exist')
  }
  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password , salt);
  //Create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });
  try {
    const savedUser = await user.save();
    res.send({user_id: savedUser._id});
  } catch (error) {
    res.status(400).send(err);
  }
});

//Login 
router.post("/login", async (req, res) => {
    //Validation
    const { error } = LoginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //checking if the email exists
    const user = await User.findOne({email : req.body.email});
    if (!user){
        return res.status(400).send('User Not Found')
    }
    //Password is correct
    const validPass = await bcrypt.compare(req.body.password , user.password);
    if(!validPass) {
        return res.status(400).send('Invalid Password')
    }
    //create and assign a token
    const token = jwt.sign({_id : user._id},process.env.TOKEN_SECRET);
    res.header('auth-token' , token).send(token)
    
  });
module.exports = router;
