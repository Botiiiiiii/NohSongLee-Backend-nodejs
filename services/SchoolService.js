const Board = require("../models/board"); // Database Model;
const Comment = require("../models/comment"); // Database Model;
const School = require("../models/school");
var moment = require('moment');
const { sendError, sendSuccess } = require("../middlewares/response");
const { promise } = require("../models/db");


class SchoolService {

  async searchSchool ( req ) { // 게시판 글 작성
    try {
        const school = new School();
        var searchWord = req.query.searchWord;
        const result = await school.searchSchool(searchWord);
        
        if(result.length){
            return sendSuccess(result);
        }
        else{
            return sendSuccess("No Match");
        }

    } catch (err) {
        return sendError(err)
    }
    
  }

  async searchInSchool (req){
    try {
        const school = new School();
        const searchWord = req.query.searchWord;
        const schoolId = req.params.school_id;

        var result = await school.searchInSchool(searchWord, schoolId);
        if(result.length){
            return sendSuccess(result);
        }
        else{
            return sendSuccess("No Match");
        }
    } catch (err) {
        console.log(err)
        return sendError(err);
    } 
  }

  async getSchool (req) {
    try {
        const school = new School();
        const schoolId = req.params.school_id;

        var result1 = await school.findById(schoolId);
        
        if(result1.length){
            var result2 = await school.findAllInSchool(schoolId);
            return sendSuccess([result1,result2]);
        }
        else{
            return sendSuccess("No Match");
        }
    } catch (err) {
        console.log(err)
        return sendError(err);
    } 
  }
}

module.exports = SchoolService;