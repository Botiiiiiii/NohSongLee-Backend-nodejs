var SchoolService = require('../services/SchoolService');

// 새 객체 생성
exports.search = async (req,res,next)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const schoolService = new SchoolService();
    try {
        var result = await schoolService.searchSchool(req);    
        return res.send(result);
    } catch (err) {
        console.log(err);
    }
    
};

exports.searchInSchool = async (req,res,next) => {
    
    const schoolService = new SchoolService();

    try {
        var result = await schoolService.searchInSchool(req);
        return res.status(200).send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}

exports.getSchoolInfo = async (req,res,next) => {
    const schoolService = new SchoolService();

    try {
        var result = await schoolService.getSchool(req);
        return res.status(200).send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}