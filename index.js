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

app.post('api/users', (req,res)=>{
    const {nama, nim, kelas,} = req,body;

    if(!nama || !nim || !kelas ){
        return res.status(400).json({message: "nama NIM dan kelas wajib disisi"});
    }
})