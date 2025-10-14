// // ENDPOINTS ----
// app.get("/", (req, res) => {
//     res.send("Página inicial")
// });


// // get de todos os usuários
// // aqui só se passa o res, por que não se pega nada do usuário por req
// app.get("/users", (res: Response) => {
//     res.json(users);
// });


// // get de usuário específico
// app.get("/users/:id", (req: Request, res: Response) => {

//     // parsando de string para int, por que o id vem na url como string
//     // o 10 serve para o parser saber que o número está na escala decimal
//     const userId: number = parseInt(req.params.iuserI, 10);

//     if (isNaN(userId) || userId <= 0) {
//         return res.status(400).json({message: "Id inválido."});
//     }

//     // procura o usuário cujo id é igual ao id que veio na url
//     // caso não encontrar, user fica como underfined
//     // caso encontrar, foundUser fica como o objeto retornado em user
//     const foundUser = users.find(user => user.id === userId);

//     if (!foundUser) {
//         return res.status(404).json({ message: "Usuário não encontrado." });
//     }

//     res.json(foundUser);
// });


// // cadastro de usuário
// app.post("/users", (req: Request, res: Response) => {
//     // vai receber o novo usuário criado
//     const novoUser = req.body;

//     /* VERSÃO SEM REDUCE:
//     // variável iniciada com 0 por que inicialmente não tem nenhum id cadastrado
//     let maxId: number = 0;

//     // atualiza qual o maior id (será o último usuário cadastrado)
//     for (const user of users) {
//         if (novoUser.id > maxId) {
//             maxId: novoUser.id;
//         }
//     }
//     */

//     // VERSÃO COM REDUCE:
//     const maxId: number = users.reduce((max, user) => (user.id > max ? user.id : max), 0);

//     users.push(novoUser);
//     res.status(201).json("Usuário cadastrado com sucesso!");
// });


// // atualização de usuário
// app.put("/users/:id", (req: Request, res: Response) => {
//     const userId: number = parseInt(req.params.id, 10);

//     if (isNaN(userId) || userId <= 0) {
//         return res.status(400).json({message: "Id inválido."});
//     }

//     // findIndex: método de array que retorna o índice do primeiro elemento que satisfaz a condição fornecida na função
//     const userIndex: number = users.findIndex(u => u.id === userId);

//     /*
//         (u => u.id === id)
//         - u é um objeto do array users
//         - u.id está acessando o campo id do objeto retornado
//         - u.id === id verifica se o id do objeto é igual ao id passado na url
//         - retorna true se forem iguais, e false caso contrário 
//     */

//     // -1 é retornado por que significa que nenhum índice de id válido foi encontrado (>= 0 seria válido)
//     if (userIndex === -1) {
//         return res.status(404).json({ message: "Usuário não encontrado" });
//     }

//     // destructuring
//     // pega propriedades específicas de um objeto e cria variáveis com esses nomes
//     // essas variáveis vão servir para receber o input do usuário
//     const { novoNome, novaIdade } = req.body;

//     // currentUser é o usuário sendo atualizado
//     // ele recebe como valor o objeto do array users que tem o id fornecido
//     const currentUser: User  = users[userIndex];

//     // validação do input do campo de nome
//     if (novoNome !== undefined) {       // se o nome tiver sido enviado
//         if (typeof novoNome !== 'string' || novoNome.trim() === "") {       // se o nome não for uma string ou se for uma string vazia ou só com espaços
//             return res.status(400).json({ message: "O nome não pode estar vazio." });
//         }
//         currentUser.nome = novoNome;
//     }
    
//     // validação do input do campo de idade
//     if (novaIdade !== undefined) {
//         if (typeof novaIdade !== 'number' || !Number.isInteger(novaIdade) || novaIdade <= 0) {      // o input deve ser um número, inteiro, e maior ou igual a 0
//             return res.status(400).json({ message: "A idade deve ser um número inteiro positivo." });
//         }
//         currentUser.idade = novaIdade;
//     }

//     if (novoNome === undefined && novaIdade === undefined) {
//         return res.status(400).json({ message: "Nenhum dado para atualizar foi fornecido." });
//     }

//     // substituindo o usuário que estava no array users pela versão atualizada
//     users[userIndex] = currentUser;
//     res.json(currentUser);
// });


// // delete de usuário
// app.delete("/users/:id", (req: Request, res: Response) => {
//     const userId: number = parseInt(req.params.id, 10);
//     const userIndex: number = users.findIndex(user => user.id == userId);

//     if (userIndex == -1) {
//         res.status(404).json("Usuário não encontrado!");
//     }

//     // deletando:
//     users.splice(userIndex);

//     res.status
// });