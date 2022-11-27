const authMiddleware = require("../middlewares/jwtauth");

module.exports = app =>{
    const users = require("../controllers/UserController");
    const board = require("../controllers/BoardController");

    // 회원가입
    app.post("/users/signup", users.create);
    app.post("/users/login", users.login);

    
    app.post("/board/write", authMiddleware, board.create);
    app.get("/board/list", board.getList);

};