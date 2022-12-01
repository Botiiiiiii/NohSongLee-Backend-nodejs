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
        const [rows,fields] = await sql.promise().query("SELECT user.user_id, user.nickname, user.name, user.phone, user.email, school.name as school, user.regdate FROM user  LEFT JOIN school on user.school_id = school.id WHERE user_id = ? and password = ?", [userId, password], (err,res) => {
            if(err){
                console.log(err);
            }
        });
    
        return rows;    
    } catch (error) {
        console.log(error);
    }
    
};

User.findFollowById = async (userId) => {
    try {
        const [rows,fields] = await sql.promise().query("SELECT follow.school_id, school.name FROM follow join school on follow.school_id = school.id WHERE follow.user_id = ?", userId, (err,res) => {
            if(err){
                console.log(err);
            }
        });
    
        return rows;    
    } catch (error) {
        console.log(error);
    }
    
};

User.AddFollow = async (data) => {
    try {
        const [rows,fields] = await sql.promise().query("INSERT INTO follow SET ?",data);

        return rows;    
    } catch (error) {
        console.log(error);
        return error
    }
}

User.DeleteFollow = async (data) => {
    try {
        const [rows,fields] = await sql.promise().query("DELETE FROM follow WHERE user_id = ? and school_id = ? ",data);

        return rows;    
    } catch (error) {
        console.log(error);
        return error
    }
}

User.findFollowById2 = async (userId, schoolId) => {
    try {
        const [rows,fields] = await sql.promise().query("SELECT follow.school_id, school.name FROM follow join school on follow.school_id = school.id WHERE follow.user_id = ? and follow.school_id = ?", userId, schoolId, (err,res) => {
            if(err){
                console.log(err);
            }
        });
    
        return rows;    
    } catch (error) {
        console.log(error);
    }
    
};

module.exports = User;