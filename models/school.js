const sql = require("./db.js");

class School {

    async searchSchool (word) {
        try {
            var searchWord = "%" + word + "%";
            const [rows,fields] = await sql.promise().query("SELECT name FROM school where name like ?",searchWord);
            return rows;
        } catch (error) {
            console.log(error);
            return error
        }
    }

    async searchInSchool (word, school_id) {
        try {
            var searchWord = "%" + word + "%";
            const [rows,fields] = await sql.promise().query("SELECT board.id, board.title, board.writer, (select school.name From user left join school on user.school_id = school.id WHERE user.nickname = board.writer) as writer_school, board.content, school.name as school, board.topic, board.regdate, board.view_count, board.like_count, board.comment_count as writer_school FROM board left join school on board.school_id = school.id WHERE board.school_id = ? and board.content like ? ORDER BY regdate DESC",[school_id,searchWord]);
            return rows;
        } catch (error) {
            console.log(error);
            return error
        }
    }

    async findByName (name) {
        try {
            const [rows,fields] = await sql.promise().query("SELECT name FROM school where name = ?",name);
            return rows;
        } catch (error) {
            console.log(error);
            return error
        }
    }

    async findById (schoolId) {
        try {
            const [rows,fields] = await sql.promise().query("SELECT * FROM school where id = ?",schoolId);
            return rows;
        } catch (error) {
            console.log(error);
            return error
        }
    }

    async findAllInSchool (schoolId) {
        try {
            const [rows,fields] = await sql.promise().query("SELECT board.id, board.title, board.writer, (select school.name From user left join school on user.school_id = school.id WHERE user.nickname = board.writer) as writer_school, board.content, school.name as school, board.topic, board.regdate, board.view_count, board.like_count, board.comment_count as writer_school FROM board left join school on board.school_id = school.id WHERE board.school_id = ? ORDER BY regdate DESC",schoolId);
            return rows;
        } catch (error) {
            console.log(error);
            return error
        }
    }
}


module.exports = School;