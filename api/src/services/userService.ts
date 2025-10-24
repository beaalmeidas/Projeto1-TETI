import prisma from "../prisma/client";
import bcrypt from "bcryptjs";
import { ServiceError } from "../utils/serviceError";


export const usuarioService = {

    async createUsuario(
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

        // passando os dados para a criação do usuário no banco
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

        return {
            message: "Usuário criado com sucesso.",
            usuario: novoUsuario
        };
    },


    async getAllUsuarios() {
        const usuarios = await prisma.usuario.findMany({
            select: {
                id: true,           // true = campos que queremos que apareçam no resultado da busca
                primeiroNome: true,
                ultimoSobrenome: true,
                email: true,
                createdAt: true
            }
        });

        if (usuarios.length === 0) {
            throw new ServiceError("Nenhum usuário foi encontrado.", 404);
        }

        return usuarios;
    },


    async getUsuarioById(id: number) {
        const usuarioBuscado = prisma.usuario.findUnique( { where: { id } } );

        if (!usuarioBuscado) {
            throw new ServiceError("Usuário não encontrado.", 404);
        }

        return usuarioBuscado;
    },


    async updateUsuario(
        id: number,
        data: {
            primeiroNome?: string,
            ultimoSobrenome?: string,
            email?: string,
            senha?: string
        }
    ) {
        const usuarioBuscado = prisma.usuario.findUnique( { where: { id } } );

        if (!usuarioBuscado) {
            throw new ServiceError("Usuário não encontrado.", 404);
        }

        if (data.senha) {
            data.senha = await bcrypt.hash(data.senha, 10);
        }

        const usuarioAtualizado = await prisma.usuario.update({
            where: { id },
            data
        });

        return {
            message: "Usuário atualizado com sucesso.",
            usuario: usuarioAtualizado
        };
    },


    async deleteUsuario(id: number) {
        const usuarioBuscado = prisma.usuario.findUnique( { where: { id } } );
    
        if (!usuarioBuscado) {
            throw new ServiceError("Usuário não encontrado.", 404);
        }

        const usuarioDeletado = await prisma.usuario.delete({ where: { id } });

        return {
            message: "Usuário deletado com sucesso.",
            usuario: usuarioDeletado
        };
    }
}