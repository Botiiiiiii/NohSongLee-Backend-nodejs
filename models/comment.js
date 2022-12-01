const sql = require("./db.js");

const Comment = function(comment){
    this.board_id = comment.boardId;
    this.parent_id = comment.parentId;
    this.writer = comment.writer;
    this.content = comment.content;
    this.regdate = comment.regdate;
    this.comment_like = 0;
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

Comment.findByboardId = async (boardId) => {
    try {
        const [rows,fields] = await sql.promise().query("SELECT comment.id, comment.board_id, comment.parent_id, comment.writer, school.name as writer_school, comment.content, comment.regdate FROM comment left join user on comment.writer = user.nickname left join school on user.school_id = school.id Where board_id = ? ORDER BY comment.regdate", boardId, (err,res)=>{
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


Comment.update = async (updated, commentId) => {
    try {
        const [rows,fields] = await sql.promise().query("update comment SET ? WHERE id = ?",[updated,commentId]);
    
        return rows;
    } catch (error) {
        console.log(error);
    }
}

Comment.delete = async (commentId) => {
    try {
        const [rows,fields] = await sql.promise().query("DELETE FROM comment WHERE id = ?",commentId);
    
        return rows;
    } catch (error) {
        console.log(error);
    }
}

Comment.addcount = async () => {
    try {
        const [rows,fields] = await sql.promise().query("UPDATE board SET view_count = view_count + 1");

        return rows;    
    } catch (error) {
        console.log(error);
        return error
    }
}

module.exports = Comment;