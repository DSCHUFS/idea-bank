// signupAPI
exports.EMAIL_EXIST = `SELECT user_id, user_email, user_password FROM Users WHERE user_email = ?;`
// signinAPI
exports.INSERT_USER = `INSERT INTO Users (user_email, user_password, user_nickname) VALUES (?, ?, ?);`

// categoryAPI
exports.SELECT_IDEA_IDS = `SELECT idea_id FROM Ideas WHERE idea_category = ?;`
exports.SELECT_PICK_HISTORY = `SELECT idea_id FROM PickIdeas WHERE user_id = ? AND pick_at = ?;`
exports.SELECT_UPLOAD_INFO = `SELECT user_id, idea_title, idea_price FROM Ideas WHERE idea_id = ?;`
exports.SELECT_UPLOAD_USER_INFO = `SELECT user_nickname, user_grade FROM Users WHERE user_id = ?;`
exports.UPDATE_USER_POINT = `UPDATE Users SET user_point = user_point - 300 WHERE user_id = ?;`
exports.INSERT_PICK_HISTORY = `INSERT INTO PickIdeas (user_id, idea_id, pick_at) VALUES (?, ?, ?);`

// registerAPI
exports.REGISTER_IDEA = `INSERT INTO Ideas (user_id, idea_title, idea_detail, idea_price, idea_category) VALUES (?, ?, ?, ?, ?)`