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
        const tarefasAtivas = tarefas.filter((tarefa)=>{
            return tarefa.completa == false && tarefa
        })

        const quantidadeTarefasAtivas = tarefasAtivas.length;
        res.render('home',{tarefas,quantidadeTarefasAtivas})
    })
    
})
app.get("/ativas",(req,res)=>{
    const sql = `
        SELECT * FROM tarefas 
        WHERE completa = 0    
    `
    conexao.query(sql,(erro,dados)=> {
        if(erro) return console.log(erro)

        const tarefas = dados.map((data)=>{
            return {
                id: data.id,
                descricao: data.descricao,
                completa: false 
            }
        })


        const quantidadeTarefas = tarefas.length;
        res.render('ativas',{ tarefas, quantidadeTarefas })
    })

})
app.get("/completas",(req,res)=>{
    const sql = `
        SELECT * FROM tarefas 
        WHERE completa = 1    
    `
    conexao.query(sql,(erro,dados)=> {
        if(erro) return console.log(erro)

        const tarefas = dados.map((data)=>{
            return {
                id: data.id,
                descricao: data.descricao,
                completa: true 
            }
        })


        const quantidadeTarefas = tarefas.length;
        res.render('completas',{ tarefas, quantidadeTarefas })
    })

})
app.post('/completar',(req,res)=>{
    const id = req.body.id;
    const sql = `
        UPDATE tarefas set completa = '1' WHERE tarefas.id = ${id}
    `
    conexao.query(sql,(error,data)=>{
        if(error) return console.log(error)
        res.redirect('/')
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
app.post('/descompletar',(req,res)=>{
    const id = req.body.id;
    const sql = `
        UPDATE tarefas set completa = '0' WHERE tarefas.id = ${id}
    `
    conexao.query(sql,(error,data)=>{
        if(error) return console.log(error)
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