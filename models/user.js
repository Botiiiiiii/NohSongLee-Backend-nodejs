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
            return;
        }
    });
};

User.findById = async (userId,password) => {
    try {
        const [rows,fields] = await sql.promise().query("SELECT * FROM user Where user_id = ? and password = ?", [userId, password]);
    
        return rows;    
    } catch (error) {
        console.log(error);
    }
    
};

module.exports = User;