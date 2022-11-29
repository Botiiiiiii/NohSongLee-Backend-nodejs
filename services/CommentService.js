const Board = require("../models/board"); // Database Model;
const Comment = require("../models/comment"); // Database Model;
var moment = require('moment');
const { sendError, sendSuccess } = require("../middlewares/response");
const { promise } = require("../models/db");


class CommentService {

    async create(req) { // 게시판 글 작성

        const comment = new Comment({
            boardId: req.body.BoardId,
            parentId: req.body.ParentId,
            writer: req.tokenInfo.userId,
            content: req.body.content,
            regdate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        });

        try {
            const result = await Comment.create(comment);
            return sendSuccess(result)
        } catch (err) {
            return sendError(err)
        }

    }

    async update(req) {

        try {
            const commentId = req.body.CommentId;
            const userId = req.tokenInfo.userId;


            var result = await Comment.findById(commentId);
            console.log(result[0]);
            console.log(userId);
            if (result[0].writer === userId) {
                const updated = {
                    content: req.body.content,
                    regdate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                };

                const result = Comment.update(updated, commentId);
                return sendSuccess("Updated");
            }
            else
                return sendError("Only writer can modify!")
        } catch (err) {
            console.log(err)
            return sendError(err);
        }


    }

    async delete(req) {

        try {
            const commentId = req.body.CommentId;
            const userId = req.tokenInfo.userId;


            var result = await Comment.findById(commentId);
            console.log(result[0]);
            console.log(userId);
            if (result[0].writer === userId) {

                const result = Comment.delete(commentId);
                if (result.id == commentId) {
                    return sendSuccess("Deleted!");
                }
                else
                    return sendError("DB Error");
            }
            else
                return sendError("Only writer can modify!")
        } catch (err) {
            console.log(err)
            return sendError(err);
        }


    }
}

module.exports = CommentService;