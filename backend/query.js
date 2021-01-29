exports.EMAIL_EXIST = `SELECT user_email, user_password FROM Users WHERE user_email = ?;`
exports.INSERT_USER = `INSERT INTO Users (user_email, user_password, user_nickname) VALUES (?, ?, ?);`