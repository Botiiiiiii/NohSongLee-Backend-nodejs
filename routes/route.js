const authMiddleware = require("../middlewares/jwtauth");

module.exports = app =>{
    const users = require("../controllers/UserController");
    const board = require("../controllers/BoardController");
    const comment = require("../controllers/CommentController");

    // 회원가입
    app.post("/users/signup", users.create);
    app.post("/users/login", users.login);

    // 게시판
    app.post("/board/write", authMiddleware, board.create);
    app.get("/board/list", board.getList);
    app.get("/board/:BoardId", board.getId);
    app.put("/board/edit", authMiddleware,board.updateBoardId);

    // 댓글
    app.post("/comment/write", authMiddleware, comment.create);
    app.put("/comment/edit", authMiddleware, comment.updatecommentId);

};