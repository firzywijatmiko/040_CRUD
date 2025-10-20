const express = require("express")
let mysql = require("mysql2");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/',(req, res)=> {
    console.log(`server is running on port ${PORT}`);
})

const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    pasword: 'Miko123',
    database: 'biodata',
    port : 3308//sesuaikan sama port mysql
})

db.conection((err)=>{
    if (err){
        console.error('error connecting to database:' + err.stack);
        return;
    }
    console.log('connection succesfully');
})

app.get('api/users', (req, res)=>{
    db.query('SELLECT * from users',(err, results)=>{
        if(err){
            console.error('error excuting query:' + err.stack);
            res.status(500).send('error retching users');
            return;
        }
        res.json(result);
    })
})

app.post('api/users', (req, res) => {
    const {nama, nim, kelas} = req.body;

    if(!nama || !nim || !kelas){
        return res.status(400).json({message: "Nama, NIM, dan Kelas wajib diisi."});
    }

    db.query(
        "INSERT INTO users (nama, nim, kelas) VALUES (?, ?, ?)",
        [nama, nim, kelas],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Database error"});
            }
            res.status(201).json({ message: "User created succesfully"});
        }
    );
});

app.put("api/users/:id", (req,res) => {
    const userid = req.params.id;
    const {nama, nim, kelas} = req.body;
    db.query(
        'UPDATE mahasiswa SET nama = ?, nim = ?, kelas = ? WHERE id = ?',
        [nama, nim, kelas, userid],
        (err, result) => {
            if (err){
                console.error(err);
                return res.status(500).json({ message: "Database error"});
            }
            res.json({ message: "user updated successfully"});
        }
    )
})