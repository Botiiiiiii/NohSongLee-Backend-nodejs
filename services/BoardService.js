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

  async getAll (req) { // Board 조회
    try {
        const result = await Board.findAll();
        return sendSuccess(result)
    } catch (err) {
        return sendError(err)
    }
}


  async getOne (req) {
    try {
        const boardId = req.params.BoardId
        console.log(boardId)
        // const result = promise.all([
        //     await Board.findByboardId(boardId),
        //     await Comment.findByboardId(boardId)
        // ])
            const result1 = await Board.findByboardId(boardId);
            const result2 = await Comment.findByboardId(boardId);
            var result = [result1, result2];
        return sendSuccess(result)
    } catch (err) {
        return sendError(err)
    }
  }
}

module.exports = BoardService;