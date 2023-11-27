const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require('mysql2')


const app = express();
app.engine("handlebars",exphbs.engine());
app.set("view engine", "handlebars")
app.use(express.static('public'))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

/* Rotas */
app.get("/",(req,res)=>{
    const sql = `SELECT * FROM tarefas`;
    conexao.query(sql,(error,datas)=>{
        if (error) return console.log(error);

        const tarefas = datas.map((data)=>{
            return {
                id: data.id,
                descricao: data.descricao,
                completa: data.completa == 0 ? false : true
            }
        })
        res.render('home',{tarefas})
    })
    
})
app.post("/criar",(req,res)=>{
    const descricao = req.body.descricao;
    const completa = 0;

    const sql = `
        INSERT INTO tarefas(descricao,completa)
        VALUES ('${descricao}','${completa}')
    `
    conexao.query(sql,(erro)=>{
        if (erro) return console.log(erro);
        res.redirect('/')
    })
})

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '.caua2023.',
    database: 'todoapp',
    port: 3306
})

conexao.connect((erro)=>{
    if (erro){
        return console.log(erro)
    }
    console.log('Estou conectado ao MySQL')
    app.listen(3000, ()=>{
        console.log("Server rodando na porta 3000, http://localhost:3000")
    });
})