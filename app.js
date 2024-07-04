const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE user (id INT, name TEXT,carrera TEXT)");
    const stmt = db.prepare("INSERT INTO user VALUES (?, ?)");

    stmt.run(1, "daniel",'matematicas');
    stmt.run(2, "omar",'administracion');

    stmt.finalize();

    db.each("SELECT id, name FROM user", (err, row) => {
        console.log(`User ID: ${row.id}, Name: ${row.name} carrera: ${row.carrera}`);
    });
});
db.close();