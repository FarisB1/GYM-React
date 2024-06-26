const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


app.listen(3002, () => {
  console.log('Server is running on port 3002');
});

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'gym'
});

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const ime = req.body.ime;

    const checkQuery = "SELECT * FROM korisnici WHERE korisnicko_ime = ? OR email = ?";
    db.query(checkQuery, [username, email], (checkErr, checkResult) => {
        if (checkErr) {
            console.log(checkErr);
            res.status(500).send('Internal Server Error');
        } else {
            if (checkResult.length > 0) {
                res.send('Username or email already exists');
            } else {
                const insertQuery = "INSERT INTO korisnici (ime, email, korisnicko_ime, sifra) VALUES (?, ?, ?, ?)";
                const values = [ime, email, username, password];

                db.query(insertQuery, values, (insertErr, insertResult) => {
                    if (insertErr) {
                        console.log(insertErr);
                        res.status(500).send('Internal Server Error');
                    } else {
                        res.send('User registered successfully');
                    }
                });
            }
        }
    });
});


app.post('/login', (req, res) => {
    const username = req.body.loginUsername;
    const password = req.body.loginPassword;

    db.query("SELECT * FROM korisnici WHERE korisnicko_ime = ? AND sifra = ?", [username, password], (err, result) => {
        if (err) {
            res.send({err: err});
        }
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({message: 'Wrong username or password'});
        }
    });
}
);

app.post('/kontakt', (req, res) => {
    const ime = req.body.ime;
    const email = req.body.email;
    const telefon = req.body.telefon;
    const poruka = req.body.poruka;

    const SQL = "INSERT INTO poruke (ime, email, telefon, poruka) VALUES (?, ?, ?, ?)"
    const VALUES = [ime, email, telefon, poruka]

    db.query(SQL, VALUES, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Values inserted');
        }
    });
}
);

app.post('/uloga', (req, res) => {
    
    const korisnicko_ime = req.body.loginUsername;

    const SQL = "SELECT id, uloga FROM korisnici WHERE korisnicko_ime = ?"
    const VALUES = [korisnicko_ime]

    db.query(SQL, VALUES, (err, result) => {
        if (err) {
            res.send({ error: err });
            return;
        }
        if (result.length > 0) {
            const uloga = result[0].uloga;
            res.json(uloga);
        } else {
            res.send({ message: 'Nema uloge' });
        }
    });
});

app.post('/id', (req, res) => {

    const korisnicko_ime = req.body.loginUsername;
    const SQL = "SELECT * FROM korisnici WHERE korisnicko_ime = ?"
    const VALUES = [korisnicko_ime]

    db.query(SQL, VALUES, (err, result) => {
        if (err) {
            res.send({ error: err });
            return;
        }
        if (result.length > 0) {
            const rez = result[0];
            res.json(rez);
        } else {
            res.send({ message: 'Nema uloge' });
        }
    });
});


app.get('/users', (req, res) => {
    const sql = "SELECT * FROM korisnici";
    db.query(sql, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    })
  })

app.post('/updateUloga', (req, res) => {
    const email = req.body.email;
    const uloga = req.body.uloga;

    const SQL = "UPDATE korisnici SET uloga = ? WHERE email = ?"
    const VALUES = [uloga, email]

    db.query(SQL, VALUES, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Values inserted');
        }
    });
})

app.get('/poruke', (req, res) => {
    const sql = "SELECT * FROM poruke";
    db.query(sql, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    })
  })

  app.get('/poruke/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM poruke WHERE id = ?";
    
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (data.length === 0) {
            return res.status(404).json({ message: 'Message not found' });
        }
        return res.json(data[0]);
    });
});

app.post('/zakazi', (req, res) => {
    const ime = req.body.ime;
    const email = req.body.email;
    const telefon = req.body.telefon;
    const trener = req.body.trener;
    const startDate = req.body.startDate;

    const SQL = "INSERT INTO termini (ime, email, telefon, trener, datum) VALUES (?, ?, ?, ?, ?)"
    const VALUES = [ime, email, telefon, trener, startDate]

    db.query(SQL, VALUES, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Values inserted');
        }
    });
});

app.get('/poruke', (req, res) => {
    const sql = "SELECT * FROM poruke";
    db.query(sql, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    })
  })


  app.get('/treninzi/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM termini WHERE trener = ?";
    
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (data.length === 0) {
            return res.status(404).json({ message: 'No messages found' });
        }
        return res.json(data); // Return all matching rows
    });
});

app.get('/provjera/:id', (req, res) => {
    const id = req.params.id;

    const SQL = "SELECT ime FROM korisnici WHERE id = ?"
    const VALUES = [id]

    db.query(SQL, VALUES, (err, result) => {
        if (err) {
            res.send({ error: err });
            return;
        }
        if (result.length > 0) {
            const name = result[0].ime;

            console.log(`Name: ${name}`);

            const SQL2 = "SELECT * FROM termini WHERE ime = ?";
            const Values = [name];

            db.query(SQL2, Values, (err, rez) => {
                if (err) {
                    res.send({ error: err });
                    return;
                }
                res.json(rez);
            });

        } else {
            res.send({ message: 'Nema uloge' });
        }
    });
});
