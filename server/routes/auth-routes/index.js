const express = require("express");
const { registerUser, loginUser } = require("../../controllers/auth-controller");
const authenticateMiddleware = require("../../middleware/auth-middleware");
const router = express.Router();
router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/check-auth',authenticateMiddleware,(req,res)=>{
    res.status(200).json({
        success:true,       
        message:"User is authenticated",
        data:{
            user:req.user,
        }
    });
}
);
module.exports = router;    