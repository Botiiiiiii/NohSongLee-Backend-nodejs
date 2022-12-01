
var UserService = require('../services/UserService');

// 새 객체 생성
exports.create = async (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const userService = new UserService();

    try {
        var result = await userService.signup(req);    
        return res.send(result);
    } catch (err) {
        console.log(err);
    }
    
};

// id로 조회
exports.login = async (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const userService = new UserService();

    try {
        var result = await userService.login(req);    
        return res.send(result);
    } catch (err) {
        console.log(err);
    }
};

// id로 조회
exports.findFollow = async (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const userService = new UserService();

    try {
        var result = await userService.findFollow(req);    
        return res.send(result);
    } catch (err) {
        console.log(err);
    }
};

// id로 조회
exports.addFollow = async (req,res)=>{
    if(!req.body || !req.body.school_id){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const userService = new UserService();

    try {
        var result = await userService.followadd(req);    
        return res.send(result);
    } catch (err) {
        console.log(err);
    }
};

// id로 조회
exports.DeleteFollow = async (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const userService = new UserService();

    try {
        var result = await userService.followdelete(req);    
        return res.send(result);
    } catch (err) {
        console.log(err);
    }
};

exports.addlike = async (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const userService = new UserService();

    try {
        var result = await userService.AddLike(req);    
        return res.send(result);
    } catch (err) {
        console.log(err);
    }
};

exports.deletelike = async (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const userService = new UserService();

    try {
        var result = await userService.DeleteLike(req);    
        return res.send(result);
    } catch (err) {
        console.log(err);
    }
};