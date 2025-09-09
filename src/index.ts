import express from "express";
import { Express, Request, Response }  from "express"; // importanto tipos do Express



const app: Express = express(); // o aplicativo é do framework Express.js, então tem que receber o tipo do framework
const port: number = 3000; // a porta na qual ele vai rodar é int

app.use(express.json());


// criando um novo tipo
type User = {
    id: number;
    nome: string;
    idade: number;
}


const user: User[] = [ // tipando o array de usuários com o tipo User criado
    {
        id: 1,
        nome: 'Beatriz',
        idade: 23
    },
    {
        id: 2,
        nome: 'Guilherme',
        idade: 21
    }
]


// ENDPOINTS ----
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

app.listen(port, () => {
    console.log(API rodando na porta)
});