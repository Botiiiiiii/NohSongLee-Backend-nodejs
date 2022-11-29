const sql = require("./db.js");

const Comment = function(comment){
    this.board_id = comment.board_id;
    this.parent_id = comment.parent_id;
    this.writer = comment.wrtier;
    this.content = comment.content;
    this.regdate = comment.regdate;
};

Comment.create = (newComment, result) => {
    sql.query("INSERT INTO comment SET ?",newComment, (err,res)=>{
        if(err){
            console.log("error: ",err);
            return;
        }
    });
};

Comment.findById = async (id) => {
    try {
        const [rows,fields] = await sql.promise().query("SELECT * FROM comment WHERE id = ?", id, (err,res)=>{
            if(err){
                console.log("error: ",err);
                return;
            }
        });
    
        return rows;    
    } catch (error) {
        console.log(error);
    }
    
};

Comment.findByboardId = async (boardId) => {x
    try {
        const [rows,fields] = await sql.promise().query("SELECT * FROM comment Where board_id = ? ORDER BY regdate", boardId, (err,res)=>{
            if(err){
                console.log("error: ",err);
                return;
            } 
        });
    
        return rows;    
    } catch (error) {
        console.log(error);
    }
    
};


Comment.update = async () => {
    try {
        const [rows,fields] = await sql.promise().query("SELECT * FROM board ORDER BY regdate");
    
        return rows;    
    } catch (error) {
        console.log(error);
    }
}

module.exports = Comment;