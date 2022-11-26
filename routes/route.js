module.exports = app =>{
    const users = require("../controllers/UserController");

    // 회원가입
    app.post("/users", users.create);

};