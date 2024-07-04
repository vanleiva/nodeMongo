const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:')

db.serealize(()=>{

    db.run('CREATE TABLE alumno(carnetID int, name text, carrera text)');

    const stmt = db.prepare('INSERT INTO alumno values(?,?,?)');

    stmt.run(1,'karime','contadora');
    stmt.run(2,'josue','ing. civil');
    stmt.run(3,'jeremiah','lic. administracion');

    stmt.finalize();

    db.each()
    db.each("SELECT carnetID, name, carrera FROM alumno", (err, row) => {
        console.log(`User ID: ${row.carnetID}, Name: ${row.name}  carrera: ${row.carrera}`);
    });

    db.close();

})