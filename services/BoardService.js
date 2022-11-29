const Board = require("../models/board"); // Database Model;
const Comment = require("../models/comment"); // Database Model;
var moment = require('moment');
const { sendError, sendSuccess } = require("../middlewares/response");
const { promise } = require("../models/db");


class BoardService {

  async create ( req ) { // 게시판 글 작성
    
    const board = new Board({
        title: req.body.title,
        writer: req.tokenInfo.userId,
        content: req.body.content,
        topic: req.body.topic,
        school_id: req.body.school_id,
        regdate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    });
    
    try {
        const result = await Board.create(board);
        return sendSuccess(result)
    } catch (err) {
        return sendError(err)
    }
    
  }

  async getAll () { // Board 조회
    try {
        const result = await Board.findAll();
        return sendSuccess(result)
    } catch (err) {
        return sendError(err);
    }
}


  async getOne (req) {
    try {
        var boardId = req.params.BoardId
        
        const result1 = await Board.findByboardIdWithComment(boardId);
        const result2 = await Comment.findByboardId(boardId);
        const result = [result1, result2];

        return sendSuccess(result);
    } catch (err) {
        return sendError(err);
    }
  }

  async update (req){
    
    try {
        const boardId = req.body.BoardId
        const userId = req.tokenInfo.user_id;
        
        console.log(req.body.content);

        var result = await Board.findByboardId(boardId);
        if (result[0].user_id === userId){
            const updated = {
                content: req.body.content,
                regdate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            };
            console.log(updated);
            const result = Board.update(updated,boardId);
            return sendSuccess(result);
        }
        else
            return sendError("Only writer can modify!")
   } catch (err) {
        console.log(err)
        return sendError(err);
   }

    
  }
}

module.exports = BoardService;