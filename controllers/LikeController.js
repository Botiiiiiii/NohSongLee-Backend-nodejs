
var LikeService = require('../services/LikeService');

exports.addlike = async (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const likeService = new LikeService();

    try {
        var result = await likeService.AddLike(req);    
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

    const likeService = new LikeService();

    try {
        var result = await likeService.DeleteLike(req);    
        return res.send(result);
    } catch (err) {
        console.log(err);
    }
};