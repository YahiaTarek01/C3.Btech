const DataBase = require("better-sqlite3")
const db = new DataBase('./Databases/data.db')
db.prepare(`
    CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER
        )`).run() 

function insert(name,age){
    return db.prepare("INSERT INTO user (name, age) VALUES (?, ?)").run(name, age)
}
function getOne(type,data) {
   return db.prepare(`SELECT * FROM user WHERE ${type} = ?`).all(data)
}
function getAll() {
    return db.prepare("SELECT * FROM user").all()
}
function deleteOne(type,data) {
    return db.prepare(`DELETE FROM user WHERE ${type} = ?`).run(data)
}
function update(name, age) {
    return db.prepare(`UPDATE user SET ${name}= ?, ${age} = ?`).run(name, age)
}
module.exports = {
    db, insert, getOne, getAll, deleteOne, update
}
