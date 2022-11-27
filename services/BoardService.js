const Board = require("../models/board"); // Database Model;
var moment = require('moment');
const { sendError, sendSuccess } = require("../middlewares/response");


class BoardService {

  async create ( req ) { // 게시판 글 작성
    console.log(req.tokenInfo.userId);
    const board = new Board({
        title: req.body.title,
        writer: req.tokenInfo.userId,
        content: req.body.content,
        topic_id: req.body.topic_id,
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

}

module.exports = BoardService;