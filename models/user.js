const sql = require("./db.js");

const User = function(user){
    this.user_id = user.user_id;
    this.nickname = user.nickname;
    this.phone = user.phone;
    this.password = user.password;
    this.name = user.name;
    this.school_id = user.school_id;
    this.regdate = user.regdate;
    this.email = user.email;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?",newUser, (err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
    });
};

User.findById = (userId, result) => {
    sql.query("SELECT * FROM user Where id = ?",userId,(errmres)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found user: ",res[0]);
            result(null,res[0]);
            return;
        }

        result({kind: "not_found"},null);
    });

};

module.exports = User;