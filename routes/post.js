const router = require("express").Router();
const verify = require('./verifyToken')


router.get('/',verify, (req, res) => {
  res.json({
      posts : ({
          title : 'my first post',
          description : 'random data should access'
      })
  });
//res.send(req.user._id)
//user.findbyOne({_id:req.user})
})
module.exports = router;