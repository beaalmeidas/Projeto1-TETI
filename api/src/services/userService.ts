import prisma from "../prisma/client";
import bcrypt from "bcryptjs";
import { ServiceError } from "../utils/serviceError";


export const userService = {

    async createUser(
        primeiroNome: string,
        ultimoSobrenome: string,
        email: string,
        senha: string
    ) {
        if (!primeiroNome || !ultimoSobrenome || !email || !senha) {
            throw new ServiceError("É necessário preencher todos os campos.", 400);
        }

        // checando se o usuário existe
        let usuarioExistente;
        try {
            usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
        } catch (err) {
            console.error("Erro do Prisma findUnique: ", err);
            throw new ServiceError("Ocorreu um erro ao checar a existência no usuário no banco de dados.", 500);
        }

        if (usuarioExistente) {
            throw new ServiceError("Opa! Já existe um usuário com esse email.", 400);
        }

        // caso o usuário não exista, criptografando a senha para armazenar
        let senha_hash;
        try {
            senha_hash = await bcrypt.hash(senha, 10);
        } catch (err) {
            console.error("Erro do bcryptjs: ", err);
            throw new ServiceError("Erro ao criptografar a senha do usuário.", 500);
        }

        let novoUsuario;
        try {
            novoUsuario = await prisma.usuario.create({
                data: {
                    primeiroNome,
                    ultimoSobrenome,
                    email,
                    senha: senha_hash
                },
            });
        } catch (err) {
            console.error("Erro do Prisma create: ", err);
            throw new ServiceError("Erro ao cadastrar usuário.", 500);
        }

        return novoUsuario;
    }
}