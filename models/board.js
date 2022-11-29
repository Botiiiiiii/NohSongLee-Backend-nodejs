const sql = require("./db.js");

const Board = function(board){
    this.title = board.title;
    this.writer = board.writer;
    this.content = board.content;
    this.topic = board.topic;
    this.school_id = board.school_id;
    this.regdate = board.regdate;
    this.view_count = 0;
    this.like_count = 0;
    this.comment_count = 0;
};

Board.create = (newBoard, result) => {
    try {
        sql.query("INSERT INTO board SET ?",newBoard, (err,res)=>{
            if(err){
                console.log("error: ",err);
                return;
            }
        });    
    } catch (err) {
        console.log(err)
    }
    
};
// 게시글 하나 조회
Board.findByboardId = async (boardId) => {
    try {
        const [rows,fields] = await sql.promise().query("SELECT * from board WHERE board.id = ?", boardId,  (err,res)=>{
            if(err){
                console.log("error: ",err);
                return;
            }
        });
    
        return rows;
    } catch (error) {
        console.log(error);
        return error
    }
    
};


//게시글과 댓글 조회
Board.findByboardIdWithComment = async (boardId) => {
    try {
        const [rows,fields] = await sql.promise().query("SELECT board.id, board.title, board.writer, board.content, school.name as school, board.topic, board.regdate, board.view_count, board.like_count, board.comment_count FROM board left join school on board.school_id = school.id WHERE board.id = ?", boardId,  (err,res)=>{
            if(err){
                console.log("error: ",err);
                return;
            }
        });
    
        return rows;
    } catch (error) {
        console.log(error);
        return error
    }
    
};

Board.findAll = async () => {
    try {
        const [rows,fields] = await sql.promise().query("SELECT board.id, board.title, board.writer, (select school.name From user left join school on user.school_id = school.id WHERE user.nickname = board.writer) as writer_school, board.content, school.name as school, board.topic, board.regdate, board.view_count, board.like_count, board.comment_count as writer_school FROM board left join school on board.school_id = school.id ORDER BY regdate DESC");

        return rows;    
    } catch (error) {
        console.log(error);
    }
}

Board.update = async (updated,boardId) => {
    try {
        const [rows,fields] = await sql.promise().query("update board SET ? WHERE id = ?",[updated,boardId]);

        return rows;    
    } catch (error) {
        console.log(error);
        return error
    }
}

module.exports = Board;