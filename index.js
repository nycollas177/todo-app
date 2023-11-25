const express = require("express");
const app = express();

app.listen(3000, ()=>{
    console.log("Server rodando na porta 3000, http://localhost:3000")
});

app.get("/",(req,res)=>{
    res.send("Hello World!")
})