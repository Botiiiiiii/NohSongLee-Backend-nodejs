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
    sql.query("INSERT INTO board SET ?",newBoard, (err,res)=>{
        if(err){
            console.log("error: ",err);
            return;
        }
    });
};

Board.findById = async (boardId) => {
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
    }
    
};

Board.findAll = async () => {
    try {
        const [rows,fields] = await sql.promise().query("SELECT board.id, board.title, board.writer, board.content, school.name as school, board.topic, board.regdate, board.view_count, board.like_count, board.comment_count FROM board left join school on board.school_id = school.id ORDER BY regdate");

        return rows;    
    } catch (error) {
        console.log(error);
    }
}

module.exports = Board;