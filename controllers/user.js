//import user model.
const User  = require('../models/user')
var ethers = require('ethers');  
var crypto = require('crypto');

var jwt = require('jsonwebtoken');

//create user.
exports.postCreateUser = async  (req, res, next) => { 

  //checking username exists
  const validUser = await User.findOne({ userName: req.body.userName});

   if (validUser) {
     res.send('Username already in use!') 
   } else {
      const user = new User({
        userName: req.body.userName,
        passWord: req.body.passWord,
      })
      await user.save()
      res.send(user)   
   }   

}

//Authenticate user.
exports.postAuthUser = async (req, res, next) => {
  const username = req.body.userName
  const password = req.body.passWord

 //checking username exists
  const validUser = await User.findOne({ userName: username, passWord: password});
   if (validUser) {
     // generate token
     var token = jwt.sign({ userName: username}, '71HrF85pIdLPZNM89L1Q');  
     res.json({Message:"User Authenticated!",token: token});
   } else {
      res.json("Invalid username and password!")
   }  
}

//Create Eth Address
exports.getEthAddress = async(req, res, next) => {  
  var token = req.body.token;
  try {
    var decoded = jwt.verify(token, '71HrF85pIdLPZNM89L1Q');
    if(decoded.userName === req.body.userName){

    //  console.log("Decoded Token =>", decoded);
      
      //checking username exists
      const validUser = await User.findOne({ userName: req.body.userName});
      
      if (validUser.walletAddress != undefined) {
        return res.send('You already have one Ethereum address for your account!') 
      }
      
      var id = crypto.randomBytes(32).toString('hex');
      var privateKey = "0x"+id;  
      
      var wallet = new ethers.Wallet(privateKey);
      // console.log("Address: " + wallet.address);
      
      User.updateOne({ userName:req.body.userName}, { walletAddress: wallet.address, walletKey: privateKey}, function(err,result) {
        if (err) {
          res.send(err);
        } else {
          res.json({ walletAddress: wallet.address, walletKey: privateKey});
        }
      });  
    } else {
     // console.log("I am in else part =>")
      res.json("Invalid Auth Token, Please login first!")
    }      
      
  } catch(err) {
    // err
   // console.log("I am in error part =>")
    res.json("Invalid Auth Token, Please login first!")
  }     

}

