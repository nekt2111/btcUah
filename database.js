
const fs = require('fs')
const db = 'db.json'

class Database {
    getDatabase() {
        let database = fs.readFileSync(db)
        return JSON.parse(database)
    }
    addNewUserToDatabase(user) {
        let database = this.getDatabase()
        database.push(user)
        fs.writeFileSync(db, JSON.stringify(database))
    }
}

module.exports = Database