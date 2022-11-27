module.exports = app =>{
    const users = require("../controllers/UserController");

    // 회원가입
    app.post("/users/signup", users.create);

    app.post("/users/login", users.login);


};