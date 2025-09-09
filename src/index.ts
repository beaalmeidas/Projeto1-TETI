import express from "express";

const app = express();

const user = [
    {nome: 'carlos', idade: '23'}, 
    {nome: 'gabriela', idade: '23'}
]

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Bem vindo")
});

app.get("/users", (req, res) => {
    res.json(user);
});

app.post("/users", (req, res) => {
    const novoUser = req.body;
    user.push(novoUser);
    res.json(user);
});

const port = 3000;

app.listen(port, () => {
    console.log(API rodando na porta)
});