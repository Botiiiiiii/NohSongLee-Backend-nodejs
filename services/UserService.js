const User = require("../models/user"); // Database Model
const jwt = require("jsonwebtoken");
const algorithm = process.env.JWT_ALG;
const expiresIn = process.env.JWT_EXPIRE;
const jwt_option = { algorithm, expiresIn, };
var moment = require('moment');
const { sendError, sendSuccess } = require("../middlewares/response");


class UserService {

    async signup(req) {
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

    async login(req) {
        try {
            const user_id = req.body.user_id;
            const password = req.body.password;

            let accessToken = jwt.sign({ userId: user_id, password: password }, process.env.JWT_S_KEY, jwt_option);

            var result = await User.findById(user_id, password);
            if (result.length) {
                delete result[0].password;
                result[0].jwt = accessToken;
                return sendSuccess(result[0]);
            }
            else
                return sendError("No Match")
        } catch (err) {
            console.log(err)
            return sendError(err);
        }

    };

    async findFollow(req) {
        try {
            const user_id = req.tokenInfo.userId;

            var result = await User.findFollowById(user_id);
            if (result.length) {
                return sendSuccess(result);
            }
            else
                return sendError("No Match")
        } catch (err) {
            console.log(err)
            return sendError(err);
        }

    };

    async followadd(req) {
        try {
            const user_id = req.tokenInfo.userId;
            const school_id = req.body.school_id;
            
            var followdata = {
                user_id: user_id,
                school_id: school_id
            }

            var result1 = await User.findFollowById2(user_id,school_id);
            console.log(result1);
            if (result1.length){
                return sendSuccess("Already Follow");
            }

            var result = await User.AddFollow(followdata);
            
            if (result.affectedRows == 1) {
                return sendSuccess("Follow");
            }
            else
                return sendError("DB Error");
        } catch (err) {
            console.log(err)
            return sendError(err);
        }

    };


    async followdelete(req) {
        try {
            const user_id = req.tokenInfo.userId;
            const school_id = req.body.school_id;

            var deleteData = [user_id, school_id];
            

            var result = await User.DeleteFollow(deleteData);
            console.log(result);
            if (result.affectedRows == 1) {
                return sendSuccess("Unfollow");
            }
            else
                return sendError("DB Error");
        } catch (err) {
            console.log(err)
            return sendError(err);
        }

    };
    
    // 닉네임 중복 체크
    async checkNick(req) {
        try {
            const user_id = req.tokenInfo.userId;
            const school_id = req.body.school_id;
            
            var deleteData = [user_id, school_id];
            

            var result = await User.DeleteFollow(deleteData);
            console.log(result);
            if (result.affectedRows == 1) {
                return sendSuccess(result);
            }
            else
                return sendError("DB Error");
        } catch (err) {
            console.log(err)
            return sendError(err);
        }

    };

    async AddLike(req) {
        try {
            const user_id = req.tokenInfo.userId;
            const school_id = req.body.school_id;
            var addData = {
                user_id: user_id,
                school_id: school_id
            }

            var result1 = await User.findFollowById2(user_id,school_id);
            console.log(result1);
            if (result1.length){
                return sendSuccess("Already Like");
            }

            var result = await User.addLike(followdata);
            
            if (result.affectedRows == 1) {
                return sendSuccess("Like");
            }
            else
                return sendError("DB Error");

        } catch (err) {
            console.log(err)
            return sendError(err);
        }
    };

    async DeleteAdd(req) {
        try {
            const user_id = req.tokenInfo.userId;
            const school_id = req.body.school_id;
            
            var deleteData = [user_id, school_id];
            

            var result = await User.deleteLike(deleteData);
            console.log(result);
            if (result.affectedRows == 1) {
                return sendSuccess("Ok");
            }
            else
                return sendError("DB Error");
        } catch (err) {
            console.log(err)
            return sendError(err);
        }

    };
}

module.exports = UserService;