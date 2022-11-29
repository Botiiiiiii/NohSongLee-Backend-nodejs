var CommentService = require('../services/CommentService');

// 새 객체 생성
exports.create = async (req,res,next)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const commentService = new CommentService();

    try {
        var result = await commentService.create(req);    
        return res.send(result);
    } catch (err) {
        console.log(err);
    }
    
};

exports.updatecommentId = async (req,res,next) => {
    
    const commentService = new CommentService();

    try {
        var result = await commentService.update(req);
        return res.status(200).send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}