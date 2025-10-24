import express from "express";
import { Express, Request, Response }  from "express";      // importando tipos do Express
import swaggerUi from "swagger-ui-express";
import router from "./routes/index";


const swaggerJsDoc = require("swagger-jsdoc");
const app: Express = express();         // o aplicativo é do framework Express.js, então tem que receber o tipo do framework
const port: number = 3000;              // a porta na qual ele vai rodar é int

app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Clínica API",
            version: "1.0.0",
            description: "Aplicação fullstack de clínica.",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        tags: [
            { name: "Paciente", description: "Operações de administração de pacientes" },
            { name: "Médico", description: "Operações de administração de médicos" },
            { name: "Consulta", description: "Operações de administração de consultas" },
        ],
    },
    apis: ["./src/routes/*.ts"],
};


const swaggerSpec = swaggerJsDoc(swaggerOptions);     // json com as configurações do swagger estabelecidas em swaggerOptions

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))     // passando a url e o json de configurações para o swagger usar

app.use("/", router);

app.listen(port, () => {
    console.log(`-- A API subiu na porta ${port}`)
    console.log(`-- Documentação do Swagger disponível em http://localhost:${port}/api-docs`);
});
