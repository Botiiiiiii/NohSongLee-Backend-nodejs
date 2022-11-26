const User = require("../models/user"); // Database Model
var moment = require('moment');

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
        
    console.log(user);
    try {
        const result = await User.create(user);
        return { success: true, body: result };
    } catch (error) {
        return { success: false, error: err };
    }
    
  }
}

module.exports = UserService;