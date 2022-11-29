var BoardService = require('../services/BoardService');

// 새 객체 생성
exports.create = async (req,res,next)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const boardService = new BoardService();

    try {
        var result = await boardService.create(req);    
        return res.send(result);
    } catch (err) {
        console.log(err);
    }
    
};

// 전체 조회
exports.getList = async (req,res,next)=>{

    const boardService = new BoardService();

    try {
        var result = await boardService.getAll();    
        return res.send(result);
    } catch (err) {
        console.log(err);
    }
};

// id로 조회
exports.getId = async (req,res,next)=>{

    const boardService = new BoardService();

    try {
        var result = await boardService.getOne(req);
        return res.status(200).send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
};

exports.updateBoardId = async (req,res,next) => {
    
    const boardService = new BoardService();

    try {
        var result = await boardService.update(req);
        return res.status(200).send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}

exports.search = async (req,res,next) => {

    const boardService = new BoardService();

    try {
        var result = await boardService.search(req);
        return res.status(200).send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}