const User = require("../models/user"); // Database Model
const jwt = require("jsonwebtoken");
const algorithm = process.env.JWT_ALG;
const expiresIn = process.env.JWT_EXPIRE;
const jwt_option = {algorithm, expiresIn,};
var moment = require('moment');
const { sendError, sendSuccess } = require("../middlewares/response");


class UserService {

  async signup ( req ) {
     const user = new User({
        user_id: req.body.user_id,
        nickname: req.body.nickname,
        phone: req.body.phone,
        password: req.body.password,
        name: req.body.name,
        school_id: req.body.school_id,
        email: req.body.email,
        regdate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    });
        
    try {
        const result = await User.create(user);
        return sendSuccess(result)
    } catch (err) {
        return sendError(err)
    }
    
  }
  
  async login ( req ) {
    try {
        const user_id = req.body.user_id;
        const password = req.body.password;
        
        let accessToken = jwt.sign({userId: user_id}, process.env.JWT_S_KEY,jwt_option);
        
        var result = await User.findById(user_id,password);
        if (result.length){
            delete result[0].password;
            result[0].jwt = accessToken;
            return sendSuccess(result[0]);
        }
        else
            return sendError("No Match")
   } catch (err) {
        console.log(err)
        return { success: false, error: err };
   }
   
 };


}

module.exports = UserService;