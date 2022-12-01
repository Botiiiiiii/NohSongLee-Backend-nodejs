const sql = require("./db.js");

class Like {

    async findLikeId (userId,boardId) {
        try {
            const [rows,fields] = await sql.promise().query("SELECT * FROM nohsonglee.like WHERE user_id = ? and board_id = ?",[userId,boardId]);
        
            return rows;s
        } catch (error) {
            console.log(error);
        }
    };

    async addLike (newData) {
        try {
            const [rows,fields] = await sql.promise().query("INSERT INTO nohsonglee.like SET ?",newData);
        
            return rows;
        } catch (error) {
            console.log(error);
        }
    };
    
    async deleteLike (deleteData) {
        try {
            const [rows,fields] = await sql.promise().query("DELETE FROM nohsonglee.like WHERE user_id = ? and board_id = ?",deleteData);
        
            return rows;
        } catch (error) {
            console.log(error);
        }
    };
}


module.exports = Like;