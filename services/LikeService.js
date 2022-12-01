const Like = require("../models/like"); // Database Model
const { sendError, sendSuccess } = require("../middlewares/response");


class LikeService {

    async AddLike(req) {
        try {
            const like = new Like();
            const user_id = req.tokenInfo.userId;
            const board_id = req.body.board_id;
            var addData = {
                user_id: user_id,
                board_id: board_id
            }

            var result1 = await like.findLikeId(user_id,board_id);
            console.log(result1);
            if (result1.length){
                return sendSuccess("Already Like");
            }

            var result = await like.addLike(addData);
            
            if (result.affectedRows == 1) {
                return sendSuccess("Like");
            }
            else
                return sendError("DB Error");

        } catch (err) {
            console.log(err)
            return sendError(err);
        }
    };

    async DeleteLike(req) {
        try {
            const like = new Like();
            const user_id = req.tokenInfo.userId;
            const board_id = req.body.board_id;
            
            var deleteData = [user_id, board_id];
            

            var result = await like.deleteLike(deleteData);
            console.log(result);
            if (result.affectedRows == 1) {
                return sendSuccess("Ok");
            }
            else
                return sendError("DB Error");
        } catch (err) {
            console.log(err)
            return sendError(err);
        }

    };
}

module.exports = LikeService;