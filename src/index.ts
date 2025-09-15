import express from "express";
import { Express, Request, Response }  from "express";      // importando tipos do Express



const app: Express = express();         // o aplicativo é do framework Express.js, então tem que receber o tipo do framework
const port: number = 3000;              // a porta na qual ele vai rodar é int

app.use(express.json());


// criando um novo tipo
type User = {
    id: number;
    nome: string;
    idade: number;
}


const users: User[] = [          // tipando o array de usuários com o tipo User criado
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
    res.send("Página inicial")
});


// get de todos os usuários
// aqui só se passa o res, por que não se pega nada do usuário por req
app.get("/users", (res: Response) => {
    res.json(users);
});


// get de usuário específico
app.get("/users/:id", (req: Request, res: Response) => {

    // parsando de string para int, por que o id vem na url como string
    // o 10 serve para o parser saber que o número está na escala decimal
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({message: "Id inválido."});
    }

    // procura o usuário cujo id é igual ao id que veio na url
    // caso não encontrar, user fica como underfined
    // caso encontrar, foundUser fica como o objeto retornado em user
    const foundUser = users.find(user => user.id === id);

    if (!foundUser) {
        return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.json(foundUser);
});


// cadastro de usuário
app.post("/users", (req: Request, res: Response) => {
    // vai receber o novo usuário criado
    const novoUser = req.body;

    /* VERSÃO SEM REDUCE:
    // variável iniciada com 0 por que inicialmente não tem nenhum id cadastrado
    let maxId: number = 0;

    // atualiza qual o maior id (será o último usuário cadastrado)
    for (const user of users) {
        if (novoUser.id > maxId) {
            maxId: novoUser.id;
        }
    }
    */

    // VERSÃO COM REDUCE:
    const maxId: number = users.reduce((max, user) => (user.id > max ? user.id : max), 0);

    users.push(novoUser);
    res.status(201).json("Usuário cadastrado com sucesso!");
});


// atualização de usuário
app.put("/users/:id", (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id, 10);
    
    const 
});


// delete de usuário
app.delete("/users/:id", (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id, 10);
    const userIndex: number = users.findIndex(user => user.id == userId);

    if (userIndex == -1) {
        res.status(404).json("Usuário não encontrado!");
    }

    // deletando:
    users.splice(userIndex);

    res.status
});


app.listen(port, () => {
    console.log("A API subiu na porta ${port}")
});
